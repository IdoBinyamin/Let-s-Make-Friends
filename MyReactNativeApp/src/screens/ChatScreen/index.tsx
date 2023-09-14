import {
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import React, {
	useContext,
	useEffect,
} from 'react';
import { View } from 'react-native';
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
} from '../../../config/FirebaseConfig';
import { ChatContext } from '../../../context/ChatContext';
import ContacsFloatingIcon from '../../commponents/ContacsFloatingIcon';
import { ListItem } from '../../commponents/Generic';
import useContacts from '../../hooks/useHooks';
export const Chat = () => {
	const { currentUser } = FIREBASE_AUTH;
	const {
		rooms,
		setRooms,
		unfilteredrooms,
		setUnfilteredRooms,
	} = useContext(ChatContext);
	const contacts = useContacts();

	useEffect(() => {
		const fetchChatRooms = async () => {
			let chatSnapshot;
			try {
				chatSnapshot = await getDocs(
					collection(
						FIREBASE_DB,
						'rooms'
					)
				);
			} catch (error) {
				console.error(
					'Error fetching chat rooms:',
					error
				);
			}
			if (chatSnapshot) {
				const parsedChat =
					chatSnapshot.docs.map(
						(doc) => {
							const participants =
								doc.data()
									.participants;
							console.log(
								'participants: ',
								participants
							);
							const userB =
								participants.find(
									(person) =>
										person.email ===
										currentUser?.email
								);

							return {
								...doc.data(),
								id: doc.id,
								userB,
							};
						}
					);
				setRooms(
					parsedChat.filter(
						(doc) => doc.lastMessage
					)
				);
				setUnfilteredRooms(parsedChat);
			}
		};

		fetchChatRooms();
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
				// contactName:
				// 	userContact?.contactName,
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
			{unfilteredrooms.map((room) => (
				<ListItem
					type={'chat'}
					description={room.lastMessage}
					key={room.id}
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
