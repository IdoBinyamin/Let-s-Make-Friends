import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from '../../consts';

type Props = {
	photoURL: string;
};

const Comment = ({ photoURL }: Props) => {
	return (
		<View style={styles.container}>
			<Avatar
				size={32}
				url={photoURL}
				style={styles.profilePhoto}
			/>
			<Text style={styles.userName}>
				Ploni Almoni{' '}
			</Text>
			<Text>Comment that we see</Text>

			<TouchableOpacity
				style={styles.notification}
				onPress={() => {
					console.log('like comment!');
				}}
			>
				<AntDesign
					name="hearto"
					size={20}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Comment;

const styles = StyleSheet.create({
	container: {
		height: 100,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 10,
	},
	profilePhoto: {
		marginRight: 10,
	},
	inputSearch: {
		height: 32,
		width: 256,
		borderColor: '#C7C7C7',
		borderWidth: 1,
		borderRadius: 40,
		padding: 10,
	},
	searchBtn: {
		marginLeft: -40,
	},
	userName: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	notification: {
		height: 25,
		width: 25,
		marginLeft: 25,
	},
});
