//@refresh reset
import {
	Image,
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
	ROOMS_COL,
	addRoom,
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
	const room = route.params?.room; //room when choose conversasion
	const selectedImage = route.params?.image;
	const userB = route.params?.user;
	const senderUser = {
		name: '', // get from contacts
		_id: currentUser?.uid,
		avatar: currentUser?.photoURL,
	};


	const roomId = room ? room.id : randomId;
	const ROOM_REF = doc(ROOMS_COL, roomId);
	const MESSAGES_COL = collection(
		ROOM_REF,
		'message'
	);

	// This useEffect initializes the chat room if it doesn't exist
	useEffect(() => {

		let currentUserData;
		let userBData;
		if (!room) {
			currentUserData = {
				userName: '', // get from
				email: currentUser?.email,
				photoURL: currentUser?.photoURL,
			};
			userBData = {
				userName:
					userB?.contactName || '',

				email: userB.email,
				photoURL: userB.photoURL,
			};
			addRoom(
				{
					participants: [
						currentUserData,
						userBData,
					],
					participantsArray: [
						currentUser?.email,
						userB.email,
					],
					roomId: `${currentUser?.email}${userB.email}`,
				},
				ROOM_REF
			);
		}
	}, []);

	// This useEffect listens for changes in the chat messages
	useEffect(() => {
		const unsubscribe = onSnapshot(
			MESSAGES_COL,
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
			addDoc(MESSAGES_COL, message)
		);

		const lastMessage =
			messages[messages.length - 1];
		writes.push(
			updateDoc(ROOM_REF, {
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
