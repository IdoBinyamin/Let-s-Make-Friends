import {
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
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

type Props = {};

export const AllChats = (props: Props) => {
	const [isLoading, setIsLoading] =
		useState(true);

	const { setRooms, rooms } =
		useContext(ChatContext);
	const currUser = useSelector(
		(state) => state.user.user
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
						(doc) => doc.data()
					);
				setRooms(chatRooms);
				setIsLoading(false);
			}
		);
		return unsubscribe;
	}, []);

	return (
		<ScrollView style={styles.container}>
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
				<>
					{rooms?.map((room) => {
						if (
							room.participants.includes(
								currUser.email
							)
						) {
							return (
								<MessageCard
									key={
										`${room.participants[0]}` +
										`${room.participants[1]}`
									}
									room={room}
								/>
							);
						}
					})}
				</>
			)}
		</ScrollView>
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
