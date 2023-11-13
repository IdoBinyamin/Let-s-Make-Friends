import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '70%',
		width: '100%',
	},
	headLineText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'purple',
	},
	fieldsOptionContainer: {
		flexDirection: 'row',
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fieldsTextContainer: {
		width: '65%',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	inputWrapper: {
		height: 40,
		padding: 10,
		marginRight: 15,
		marginTop: 15,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 200,
		fontSize: 15,
	},
	photoContainer: {
		height: 500,
		width: '95%',
	},
});
