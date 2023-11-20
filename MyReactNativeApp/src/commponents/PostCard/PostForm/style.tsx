import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headLineText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#2CE4C5',
	},

	inputWrapper: {
		width: '75%',
		padding: 10,
		margin: 15,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 200,
		fontSize: 15,
	},
	photoContainer: {
		height: 430,
	},
	addOrCancelPost: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		width: '100%',
	},
});
