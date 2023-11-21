import React, { useContext } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	View,
} from 'react-native';
import { MessageCard } from '../../consts';
import { ChatContext } from '../../../context';
import { useSelector } from 'react-redux';

type ChatRoom = {
	participants: string[];
	// Add other properties based on your data structure
};
type Props = {
	isLoading: boolean;
};

export const AllChats = ({
	isLoading,
}: Props) => {
	const { rooms } = useContext(ChatContext);
	const currUser = useSelector(
		(state: {
			user: { user: { email: string } };
		}) => state?.user.user
	);

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
