import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from '../../../consts';

type Props = {
	photoURL: string;
	userName: string;
	comment: string;
	// isCommentLikedHandler: () => void;
};

const Comment = ({
	photoURL,
	userName,
	comment,
}: // isCommentLikedHandler,
Props) => {
	return (
		<View style={styles.container}>
			<Avatar
				size={32}
				url={photoURL}
				style={styles.profilePhoto}
			/>
			<Text style={styles.userName}>
				{userName}
			</Text>
			<Text style={styles.commentText}>
				{comment}
			</Text>
		</View>
	);
};

export default Comment;

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: '85%',
		backgroundColor: 'white',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 10,
		marginVertical: 5,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 20,
	},
	profilePhoto: {
		width: '10%',
	},

	userName: {
		fontSize: 15,
		fontWeight: 'bold',
		width: '20%',
	},
	commentText: {
		marginLeft: 15,
		width: '45%',
	},
	notification: {
		height: 25,
		width: '7%',
		marginLeft: 25,
	},
});
