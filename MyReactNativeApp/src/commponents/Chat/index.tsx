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
	QuerySnapshot,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
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
	const roomMessagesRef = collection(
		FIREBASE_DB,
		'rooms',
		roomId,
		'message'
	);

	// This useEffect initializes the chat room if it doesn't exist
	useEffect(() => {
		(async () => {
			if (!room) {
				const currentUserData = {
					displayName:
						currentUser?.displayName,
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
					userBData.photoURL =
						userB.photoURL;
				}
				const roomData = {
					participants: [
						currentUserData,
						userBData,
					],
					participantsArray: [
						currentUser?.email || '',
						userB.email || '',
					],
				};

				try {
					const roomsCollectionRef =
						collection(
							FIREBASE_DB,
							'rooms'
						);

					// Check if the "rooms" collection exists
					const roomsCollectionSnapshot =
						await getDocs(
							roomsCollectionRef
						);
					if (
						roomsCollectionSnapshot.empty
					) {
						// The "rooms" collection does not exist, so create it

						await setDoc(
							doc(
								FIREBASE_DB,
								'rooms'
							),
							{}
						);
					}

					// Create the room document
					await setDoc(
						roomRef,
						roomData
					);

					// Calculate and set the roomHash
					const emailHash = `${currentUser?.email}: ${userB.email}`;
					setRoomHash(emailHash);
				} catch (error: any) {
					console.error(
						'Error checking/creating room:',
						error.message
					);
				}
			}
		})();
	}, []);

	// This useEffect listens for changes in the chat messages
	useEffect(() => {
		const unsubscribe = onSnapshot(
			roomMessagesRef,
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
		(newMessages) =>
			setMessages((prevMessages) => {
				// Append the new messages to the chat
				return GiftedChat.append(
					prevMessages,
					newMessages
				);
			}),
		[]
	);

	// This async function handles sending new messages
	async function onSendHandler(messages: []) {
		const writes = messages.map((message) =>
			addDoc(roomMessagesRef, message)
		);

		const lastMessage =
			messages[messages.length - 1];

		writes.push(
			updateDoc(roomRef, { lastMessage })
		);

		await Promise.all(writes);
	}

	return (
		<ImageBackground
			resizeMethod={'cover'}
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
			<Text>Chat</Text>
		</ImageBackground>
	);
}
