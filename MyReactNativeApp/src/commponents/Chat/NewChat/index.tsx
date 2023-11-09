import {
	ScrollView,
	StyleSheet,
} from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RouterProps } from '../../../models';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../../config/FirebaseConfig';
import { FriendCard } from '../FriendCard';
import { ChatContext } from '../../../../context';
import { UserInfoProps } from '../../../../config/FirebaseConfig/FirebaseTypes';
import lengConfig from '../../../comons/leng';

type Props = {};

export const AddNewChat = (props: Props) => {
	const navigation =
		useNavigation<RouterProps>();
	const { rooms } = useContext(ChatContext);
	let exsistRoom: any;

	const createNewChat = async (
		userB: UserInfoProps,
		currUser: UserInfoProps
	) => {
		let id = `${new Date(
			Date.now()
		).toString()}`;
		if (rooms.length > 0) {
			exsistRoom = rooms.filter(
				(room) =>
					room.participants.includes(
						currUser.email
					) &&
					room.participants.includes(
						userB.email
					)
			);
		}

		const _doc = {
			_id: id,
			user: currUser,
			userB: userB,
			chatName: userB.displayName,
			participants: [
				`${currUser?.email}`,
				`${userB.email}`,
			],
			lastMessage: '',
		};
		if (exsistRoom?.length > 0) {
			return navigation.navigate(
				lengConfig.screens.chatRoom,
				{
					room: exsistRoom,
				}
			);
		}
		setDoc(
			doc(FIREBASE_DB, 'chats', id),
			_doc
		)
			.then(() => {
				navigation.navigate(
					lengConfig.screens.chatRoom,
					{
						room: _doc,
					}
				);
			})
			.catch((error: Error) => {
				alert('Error: ', error.message);
			});
	};
	return (
		<ScrollView style={styles.container}>
			<FriendCard
				createNewChat={createNewChat}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	addChatLine: {
		height: 50,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
	},
	searchLine: {
		flex: 1,
		marginTop: 5,
		width: '100%',
		fontSize: 18,
	},
});
