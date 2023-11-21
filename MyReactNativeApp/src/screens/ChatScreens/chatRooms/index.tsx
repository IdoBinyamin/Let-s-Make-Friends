import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import SearchLine from '../../../commponents/SearchLine';
import AddChat from '../../../../assets/Svg/add chat.svg';
import { useNavigation } from '@react-navigation/native';
import { RouterProps } from '../../../models';
import { AllChats } from '../AllChats';
import lengConfig from '../../../comons/leng';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { ChatContext } from '../../../../context';
import { FIREBASE_DB } from '../../../../config/FirebaseConfig';
import { useSelector } from 'react-redux';

export const ChatRoomsScreen = () => {
	const navigation =
		useNavigation<RouterProps>();
	const {
		rooms,
		setRooms,
		setSearchedRooms,
		searchedRooms,
	} = useContext(ChatContext);
	const [isLoading, setIsLoading] =
		useState(true);
	const currUser = useSelector(
		(state) => state?.user.user
	);

	useLayoutEffect(() => {
		const chatQuery = query(
			collection(FIREBASE_DB, 'chats'),
			orderBy('_id', 'desc')
		);

		const unsubscribe = onSnapshot(
			chatQuery,
			(querySnapShot) => {
				const chatRooms =
					querySnapShot.docs.map(
						(doc) =>
							doc.data() as ChatRoom
					);
				setRooms(chatRooms);
				setIsLoading(false);
			}
		);

		return unsubscribe;
	}, []);

	const searchChatRoom = (item) => {
		if (item !== '') {
			setSearchedRooms(
				rooms.filter((room) =>
					currUser.displayName ===
					room.user.displayName
						? room.userB.displayName.includes(
								item
						  )
						: room.user.displayName.includes(
								item
						  )
				)
			);
		} else {
			setSearchedRooms([]);
		}
	};

	return (
		<View style={styles.container}>
			<SearchLine
				isChatScreen={true}
				isSerching={searchChatRoom}
			/>
			<AllChats isLoading={isLoading} />
			<View
				style={
					styles.messagesBtnContainer
				}
			>
				<TouchableOpacity
					style={styles.messagesBtn}
					onPress={() =>
						navigation.navigate(
							lengConfig.screens
								.addNewChat
						)
					}
				>
					<AddChat />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	messagesBtnContainer: {
		height: 80,
		width: 80,
		position: 'relative',
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		borderRadius: 90,
		alignContent: 'center',
		alignItems: 'center',
	},
	messagesBtn: {
		justifyContent: 'center',
		paddingTop: 50,
		paddingLeft: 5,
	},
});
