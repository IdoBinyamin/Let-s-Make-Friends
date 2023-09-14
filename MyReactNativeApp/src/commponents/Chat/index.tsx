//@refresh reset
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { useRoute } from '@react-navigation/native';
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
} from '../../../config/FirebaseConfig';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';

const randomId = nanoid();

export default function Chat() {
	const [roomHash, setRoomHash] = useState('');
	const [messages, setMessages] = useState([]);
	const { currentUser } = FIREBASE_AUTH;
	const route = useRoute();
	const room = route.params?.room;
	const selectedImage = route.params?.image;
	const userB = route.params?.user.item;
	const senderUser = currentUser?.photoURL
		? {
				name: currentUser.displayName,
				_id: currentUser.uid,
				avatar: currentUser.photoURL,
		  }
		: {
				name: currentUser?.displayName,
				_id: currentUser?.uid,
		  };
	const roomId = room ? room.id : randomId;
	const roomRef = doc(
		FIREBASE_DB,
		'rooms',
		roomId
	);
	const messagesCollection = collection(
		FIREBASE_DB,
		'rooms',
		roomId,
		'message'
	);
	// const roomsCollection = collection(
	// 	FIREBASE_DB,
	// 	'rooms'
	// );
	const addRoom = async () => {
		let roomData;

		const currentUserData = {
			displayName: currentUser?.displayName,
			email: currentUser?.email,
		};
		if (currentUser?.photoURL) {
			currentUserData.photoURL =
				currentUser.photoURL;
		}
		const userBData = {
			displayName:
				userB?.contactName ||
				userB.displayName ||
				'',
			email: userB.email,
		};
		if (userB?.photoURL) {
			userBData.photoURL = userB.photoURL;
		}
		roomData = {
			participants: [
				currentUserData,
				userBData,
			],
			participantsArray: [
				currentUser?.email,
				userB.email,
			],
			createdAt: new Date(),
		};

		try {
			// Use the updateDoc function to update the document.
			await setDoc(roomRef, roomData);
			// Calculate and set the roomHash
			const emailHash = `${currentUser?.email}: ${userB.email}`;
			setRoomHash(emailHash);
			// await updateDoc(roomDocRef, {
			// 	roomHash,
			// });
		} catch (error: any) {
			console.error(
				'Error checking/creating room:',
				error.message
			);
		}
	};

	// This useEffect initializes the chat room if it doesn't exist
	useEffect(() => {
		if (!room) addRoom();
	}, []);

	// This useEffect listens for changes in the chat messages
	useEffect(() => {
		const unsubscribe = onSnapshot(
			messagesCollection,
			(querySnapshot) => {
				// Retrieve and process new messages
				const newMessages = querySnapshot
					.docChanges()
					.filter(
						({ type }) =>
							type === 'added'
					)
					.map((change) => {
						const message =
							change.doc.data();
						return {
							...message,
							createdAt:
								message.createdAt.toDate(),
						};
					});

				// Append the new messages to the chat
				appendMessages(newMessages);
			}
		);

		return () => unsubscribe();
	}, []);

	// This useCallback hook memoizes the appendMessages function
	const appendMessages = useCallback(
		(newMessages: any) =>
			setMessages((prevMessages) => {
				// Append the new messages to the chat
				return GiftedChat.append(
					prevMessages,
					newMessages
				);
			}),
		[messages]
	);

	// This async function handles sending new messages
	async function onSendHandler(messages: []) {
		const writes = messages.map((message) =>
			addDoc(messagesCollection, message)
		);

		const lastMessage =
			messages[messages.length - 1];
		writes.push(
			updateDoc(roomRef, {
				lastMessage,
			})
		);

		try {
			await Promise.all(writes);
		} catch (error: any) {
			console.log(error.message);
		}
	}

	return (
		<ImageBackground
			resizeMethod={'auto'}
			source={require('../../../assets/chatbg.png')}
			style={{ flex: 1 }}
		>
			{/* GiftedChat component for displaying and sending messages */}
			<GiftedChat
				onSend={onSendHandler}
				messages={messages}
				user={{
					_id: `${currentUser?.uid}`,
				}}
				renderAvatar={null}
			/>
			<Text></Text>
		</ImageBackground>
	);
}
