import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	choosePhotoContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		marginVertical: 10,
		borderRadius: 150,
		borderColor: '#2CE4C5',
		borderWidth: 2,
		width: 130,
		height: 130,
		backgroundColor: '#EBEBEB',
	},
	logoContainer: {
		height: 120,
		width: 120,
		backgroundColor: 'blue',
	},
	blanckImage: {
		height: '100%',
		width: '100%',
		borderRadius: 120,
	},
	switchPageContainer: {
		alignItems: 'center',
		marginTop: 10,
		position: 'relative',
		justifyContent: 'center',
	},
	questionText: {
		color: 'gray',
		fontWeight: '600',
		fontSize: 18,
	},
	onPressText: {
		fontWeight: '600',
		fontSize: 20,
		color: '#2CE4C5',
	},
});
