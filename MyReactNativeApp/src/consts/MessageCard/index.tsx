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

type Props = {
	room: any;
};

const MessageCard = (props: Props) => {
	const navigation =
		useNavigation<RouterProps>();
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				navigation.navigate('ChatRoom', {
					room: props.room,
				});
			}}
		>
			<View style={styles.imageContainer}>
				<Image
					source={require('../../../assets/user-icon.png')}
					style={styles.imageHolder}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text
					style={{
						color: 'black',
						fontWeight: 'bold',
					}}
				>
					{props.room.chatName}
				</Text>
				<Text
					style={{
						fontWeight: '200',
						color: 'gray',
					}}
				>
					Lorem ipsum dolor sit amet,
					consectetur adipisicing elit.
					Maxime laborum dolorum
				</Text>
			</View>
			<Text style={{ color: 'green' }}>
				{Date.now()}
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
		height: 40,
		width: 40,
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
