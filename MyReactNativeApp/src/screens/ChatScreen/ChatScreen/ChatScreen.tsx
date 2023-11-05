import { StyleSheet, View } from 'react-native';
import React, {
	useCallback,
	useLayoutEffect,
	useState,
} from 'react';
import {
	Avatar,
	Bubble,
	GiftedChat,
	InputToolbar,
} from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../../config/FirebaseConfig';

type Props = {
	route: any;
};

export const ChatScreen = ({ route }: Props) => {
	const { room } = route.params;

	const [messages, setMessages] = useState([]);
	const navigation = useNavigation();
	const user = useSelector(
		(state) => state?.user.user
	);
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<Avatar
						rounded
						source={{
							uri: user?.photoURL,
						}}
					/>
				</View>
			),
		});

		const msgQuery = query(
			collection(
				FIREBASE_DB,
				'chats',
				room._id,
				'messages'
			),
			orderBy('createdAt', 'desc')
		);
		const unsubscribe = onSnapshot(
			msgQuery,
			(snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						_id: Math.random().toString(
							36
						),
						createdAt: doc
							.data()
							.createdAt.toDate(),
						text: doc.data().text,
						user: doc.data().user,
					}))
				)
		);

		return () => {
			unsubscribe();
		};
	}, [navigation]);

	const onSend = useCallback(
		(messages = []) => {
			const { _id, createdAt, text, user } =
				messages[0];
			const _doc = {
				_id,
				createdAt,
				text,
				user,
			};
			addDoc(
				collection(
					doc(
						FIREBASE_DB,
						'chats',
						room?._id
					),
					'messages'
				),
				_doc
			);
			updateDoc(
				doc(
					FIREBASE_DB,
					'chats',
					room?._id
				),
				{
					lastMessage: _doc.text,
				}
			);
		},
		[]
	);
	return (
		<View style={{ flex: 1 }}>
			<GiftedChat
				messages={messages}
				showAvatarForEveryMessage={true}
				onSend={(messages) =>
					onSend(messages)
				}
				user={{
					_id: user._id,
					name: user.displayName,
					avatar: user.photoURL,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
