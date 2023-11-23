import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		backgroundColor: 'white',
		paddingBottom: 25,
	},

	description: {
		padding: 10,
		height: 100,
		width: '100%',
	},
	commentsContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
	},
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
	postTitleText: {
		fontSize: 15,
		alignSelf: 'flex-start',
		paddingLeft: 18,
		paddingBottom: 5,
		position: 'relative',
	},
});
