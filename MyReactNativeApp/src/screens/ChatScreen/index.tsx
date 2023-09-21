import { getDocs } from 'firebase/firestore';
import React, {
	useContext,
	useEffect,
	useState,
} from 'react';
import { Text, View } from 'react-native';
import {
	FIREBASE_AUTH,
	ROOMS_COL,
} from '../../../config/FirebaseConfig';
import { ChatContext } from '../../../context';
import ContacsFloatingIcon from '../../commponents/ContacsFloatingIcon';
import { ListItem } from '../../commponents/Generic';
import useContacts from '../../hooks/useHooks';
export const Chat = () => {
	const { currentUser } = FIREBASE_AUTH;
	const [rooms, setRooms] = useState([]);
	const {
		unfilteredRooms,
		setUnfilteredRooms,
	} = useContext(ChatContext);
	const contacts = useContacts();

	useEffect(() => {
		const fetchChatRooms = async () => {
			let chatSnapshot;
			try {
				chatSnapshot = await getDocs(
					ROOMS_COL
				);
			} catch (error) {
				console.error(
					'Error fetching chat rooms:',
					error
				);
			}
			const parsedChat =
				chatSnapshot?.docs.map((doc) => {
					const participants =
						doc.data().participants;
					const participantsArray =
						doc.data()
							.participantsArray;
					const userB =
						participants.filter(
							(person) =>
								person.email !==
								currentUser?.email
						);

					return {
						...doc.data(),
						id: doc.id,
						userB,
						participants,
						participantsArray,
					};
				});
			console.log('?', parsedChat); //TODO: find the way to get all the messages in an array to handle them after
			// console.log('!', parsedChat[0]);

			setUnfilteredRooms(parsedChat);
		};
		fetchChatRooms();
		// console.log('chats: ', chatsRooms);
	}, []);

	function getUserB(user: any, contacts: any) {
		const userContact = contacts.find(
			(c: any) => c.email === user.email
		);
		if (
			userContact &&
			userContact.contactName
		) {
			return {
				...user,
				contactName:
					userContact?.contactName,
			};
		}
		return user;
	}

	return (
		<View
			style={{
				flex: 1,
				padding: 5,
				paddingRight: 10,
			}}
		>
			{unfilteredRooms.map((room) => (
				<ListItem
					key={room.id}
					type={'chat'}
					description={
						room?.lastMessage
							? room?.lastMessage
									.text
							: room?.userB.email
					}
					time={
						room.lastMessage.createdAt
					}
					user={getUserB(
						room.userB,
						contacts
					)}
				/>
			))}
			<ContacsFloatingIcon />
		</View>
	);
};
