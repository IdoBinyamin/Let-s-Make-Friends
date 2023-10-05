import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	choosePhotoContainer: {
		marginVertical: 10,
		borderRadius: 120,
		borderColor: '#2CE4C5',
		borderWidth: 2,
		width: 120,
		height: 120,
		backgroundColor: '#EBEBEB',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	logoContainer: {
		height: 120,
		width: 120,
		backgroundColor: 'blue',
	},
	switchPageContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	questionText: {
		color: 'gray',
		fontWeight: '600',
		fontSize: 14,
	},
	onPressText: {
		fontWeight: '600',
		fontSize: 14,
		color: '#2CE4C5',
	},
});
