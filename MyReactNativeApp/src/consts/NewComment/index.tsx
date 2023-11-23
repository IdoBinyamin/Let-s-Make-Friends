import React, { useContext } from 'react';
import {
	Button,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { PostsContext } from '../../../context';
import {
	doc,
	updateDoc,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import { useSelector } from 'react-redux';

export function NewComment({ post }: any) {
	const { newComment, setNewComment } =
		useContext(PostsContext);

	const currUser = useSelector(
		(state) => state?.user.user
	);

	const newCommentHandler = async () => {
		const newComments = [
			...post.comments,
			{
				user: currUser,
				comment: newComment,
			},
		];
		if (newComment === '') {
			return alert(
				"Can't send empty comment!"
			);
		}
		try {
			await updateDoc(
				doc(
					FIREBASE_DB,
					'posts',
					post._id
				),
				{
					comments: newComments,
				}
			);
			setNewComment('');
			console.log('added comment');
		} catch (error: Error) {
			console.log(
				'User like: ',
				error.message
			);
		}
	};
	return (
		<View style={styles.newComment}>
			<TextInput
				style={styles.newCommentText}
				placeholder="Add new comment"
				value={newComment}
				onChangeText={(text) => {
					setNewComment(text);
				}}
			/>
			<Button
				title="Comment"
				onPress={newCommentHandler}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	newComment: {
		borderWidth: 1,
		borderColor: 'gray',
		alignSelf: 'center',
		width: '80%',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	newCommentText: {
		width: '70%',
	},
});
