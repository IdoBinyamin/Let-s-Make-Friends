import {
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import React, {
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

type Props = {};

export const AllChats = (props: Props) => {
	const [isLoading, setIsLoading] =
		useState(false);
	const [chats, setChats] = useState([]);

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
				setChats(chatRooms);
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
					{chats.length > 0 ? (
						<>
							{chats?.map(
								(room) => {
									return (
										<MessageCard
											key={
												room._id
											}
											room={
												room
											}
										/>
									);
								}
							)}
						</>
					) : (
						<ActivityIndicator
							size={'large'}
						/>
					)}
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
