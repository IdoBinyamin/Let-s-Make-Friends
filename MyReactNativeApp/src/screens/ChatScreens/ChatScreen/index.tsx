import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, {
	useCallback,
	useLayoutEffect,
	useState,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
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
import Ionicons from '@expo/vector-icons/Ionicons';
import lengConfig from '../../../comons/leng';
import { TopButton } from '../../../consts/TopButton';

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
	const navigateBack = () => {
		navigation.navigate(
			lengConfig.screens.chat
		);
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<View>
					<TopButton
						onPress={navigateBack}
						textStyle={{
							fontSize: 15,
							fontWeight: 'bold',
							color: 'gray',
						}}
						image={
							<Ionicons
								name="ios-chevron-back"
								size={20}
							/>
						}
						text="Back"
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
				alwaysShowSend
			/>
		</View>
	);
};

const styles = StyleSheet.create({});
