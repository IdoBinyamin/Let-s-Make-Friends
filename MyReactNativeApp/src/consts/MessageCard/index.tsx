import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RouterProps } from '../../models';
import { useSelector } from 'react-redux';
import lengConfig from '../../comons/leng';

type Props = {
	room: any;
};

const MessageCard = ({ room }: Props) => {
	const navigation =
		useNavigation<RouterProps>();
	const currUser = useSelector(
		(state) => state.user.user
	);

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				navigation.navigate(
					lengConfig.screens.chatRoom,
					{
						room: room,
					}
				);
			}}
		>
			<View style={styles.imageContainer}>
				<Image
					source={{
						uri: room.userB.photoURL,
					}}
					style={styles.imageHolder}
					resizeMode="stretch"
				/>
			</View>
			<View style={styles.textContainer}>
				<Text
					style={{
						color: 'black',
						fontWeight: 'bold',
					}}
				>
					{currUser.email ===
					room.user.email
						? room.userB.displayName
						: room.user.displayName}
				</Text>
				<Text
					style={{
						fontWeight: '200',
						color: 'gray',
					}}
				>
					{room.lastMessage}
				</Text>
			</View>
			<Text style={{ color: 'green' }}>
				{`${new Date(Date.now())
					.getHours()
					.toString()
					.padStart(2, '0')}:${new Date(
					Date.now()
				)
					.getMinutes()
					.toString()
					.padStart(2, '0')}`}
			</Text>
		</TouchableOpacity>
	);
};

export default MessageCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 5,
	},
	imageHolder: {
		height: 53,
		width: 53,
		borderRadius: 80,
	},
	imageContainer: {
		height: 60,
		width: 60,
		justifyContent: 'center',
		borderRadius: 80,
		alignItems: 'center',
		borderWidth: 2,
		padding: 1,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginLeft: 15,
	},
});
