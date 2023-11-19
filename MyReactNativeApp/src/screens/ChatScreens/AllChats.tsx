import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	View,
} from 'react-native';
import { MessageCard } from '../../consts';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import { ChatContext } from '../../../context';
import { useSelector } from 'react-redux';

type ChatRoom = {
	participants: string[];
	// Add other properties based on your data structure
};

export const AllChats: React.FC = () => {
	const [isLoading, setIsLoading] =
		useState(true);
	const { setRooms, rooms } =
		useContext(ChatContext);
	const currUser = useSelector(
		(state: {
			user: { user: { email: string } };
		}) => state?.user.user
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

	const renderRoom = ({
		item,
	}: {
		item: ChatRoom;
	}) => {
		if (
			item.participants.includes(
				currUser.email
			)
		) {
			return (
				<MessageCard
					key={`${item.participants[0]}${item.participants[1]}`}
					room={item}
				/>
			);
		}
		return null;
	};

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View
					style={
						styles.loadingContainer
					}
				>
					<ActivityIndicator
						size={'large'}
						color={'#2CE4C5'}
					/>
				</View>
			) : (
				<FlatList
					data={rooms}
					keyExtractor={(item) =>
						`${item.participants[0]}${item.participants[1]}`
					}
					renderItem={renderRoom}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	loadingContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
