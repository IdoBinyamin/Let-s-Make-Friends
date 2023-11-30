import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	headLineText: {
		alignSelf: 'center',
		paddingTop: 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#2CE4C5',
	},

	beforeFirstPhoto: {
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		height: 300,
		width: 320,
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'dashed',
		borderRadius: 1,
	},
	photoContainer: {
		height: 300,
	},
	inputWrapper: {
		padding: 10,
		marginTop: 15,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 200,
		fontSize: 15,
	},
	addOrCancelPost: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		marginVertical: 15,
		width: '100%',
	},
	btnText: {
		textAlign: 'center',
		alignSelf: 'center',
		color: 'gray',
	},
});
