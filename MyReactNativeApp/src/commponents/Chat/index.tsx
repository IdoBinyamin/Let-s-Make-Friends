//@refresh reset

import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import {
	useNavigation,
	useRoute,
} from '@react-navigation/native';
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
	orderBy,
	query,
} from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View } from 'react-native';
import { Avatar } from '../../consts';

const randomId = nanoid();

export default function Chat() {
	// const [roomHash, setRoomHash] = useState('');
	const [messages, setMessages] = useState([]);
	const navigation = useNavigation();
	const { currentUser } = FIREBASE_AUTH;
	const route = useRoute();
	let room = route.params && route.params?.room; //room when choose conversasion
	// const selectedImage = route.params?.image;
	const userB =
		route.params && route.params?.user;

	const roomId = room ? room.id : randomId;
	const ROOM_REF = doc(ROOMS_COL, roomId);
	const CHATS_COL = collection(
		ROOM_REF,
		'chats'
	);
	useEffect(() => {
		console.log('user from db', currentUser);
	}, []);
	// useEffect(() => {
	// 	if (!room) {
	// 		// console.log('i got the room', room);
	// 		addRoom(
	// 			{
	// 				participants: [
	// 					currentUser,
	// 					userB,
	// 				],
	// 				participantsArray: [
	// 					`${currentUser?.email}`,
	// 					` ${userB.email}`,
	// 				],
	// 				roomId,
	// 			},
	// 			ROOM_REF
	// 		);
	// 	}
	// }, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShowen: false,
			headerRight: () => (
				<View
					style={{
						flexDirection: 'row',
					}}
				>
					<View
						style={{
							justifyContent:
								'center',
							alignContent:
								'center',
							marginRight: 15,
						}}
					>
						<Text
							style={{
								color: 'gray', //get from colors
								fontSize: 18,
							}}
						>
							{userB?.contactName ||
								userB?.userName}
						</Text>
					</View>
					<Avatar
						size={40}
						url={userB.photoURL}
					/>
				</View>
			),
		});
	}, [navigation]);
	useLayoutEffect(() => {
		const q = query(
			CHATS_COL,
			orderBy('createdAt', 'desc')
		);

		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				// console.log(
				// 	'querySnapshot unsusbscribe'
				// );
				setMessages(
					querySnapshot.docs.map(
						(doc) => ({
							_id: doc.data()._id,
							createdAt: doc
								.data()
								.createdAt.toDate(),
							text: doc.data().text,
							user: doc.data().user,
						})
					)
				);
			}
		);
		return unsubscribe;
	}, []);

	const onSend = useCallback(
		(messages = []) => {
			setMessages((previousMessages) =>
				GiftedChat.append(
					previousMessages,
					messages
				)
			);
			const { _id, createdAt, text, user } =
				messages[0];
			addDoc(CHATS_COL, {
				_id,
				createdAt,
				text,
				user,
			});
		},
		[]
	);

	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={true}
			showUserAvatar={false}
			onSend={(messages) =>
				onSend(messages)
			}
			messagesContainerStyle={{
				backgroundColor: '#fff',
			}}
			textInputStyle={{
				backgroundColor: '#fff',
				borderRadius: 20,
			}}
			user={{
				_id: currentUser?.email,
				avatar: currentUser?.photoURL,
			}}
		/>
	);
}
