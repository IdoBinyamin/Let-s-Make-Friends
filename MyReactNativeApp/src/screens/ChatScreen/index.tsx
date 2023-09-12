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
	const { rooms, setRooms } =
		useContext(ChatContext);
	const contacts = useContacts();
	const chatQuery = query(
		collection(FIREBASE_DB, 'rooms'),
		where(
			'participansArray',
			'array-contains',
			currentUser?.email
		)
	);

	useEffect(() => {
		const fetchChatRooms = async () => {
			try {
				// Check if a user is authenticated before fetching data
				const currentUser =
					FIREBASE_AUTH.currentUser;
				if (!currentUser) {
					return; // You can choose to handle this case differently (e.g., redirect to login)
				}

				const chatSnapshot =
					await getDocs(
						collection(
							FIREBASE_DB,
							'rooms'
						)
					);

				const parsedChat =
					chatSnapshot.docs
						.filter(
							(doc) =>
								doc.data()
									.lastMessage
						)
						.map((doc) => {
							const participants =
								doc.data()
									.participants;
							const userB =
								participants.find(
									(
										person: any
									) =>
										person.email !==
										currentUser.email
								);

							return {
								...doc.data(),
								id: doc.id,
								userB,
							};
						});

				setRooms(parsedChat);
			} catch (error) {
				console.error(
					'Error fetching chat rooms:',
					error
				);
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
				contactName:
					userContact.contactName,
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
			{rooms.map((room) => (
				<ListItem
					type={'chat'}
					description={
						room.lastMessage.text
					}
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
