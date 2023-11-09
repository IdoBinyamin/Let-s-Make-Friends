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
	blanckImage: {
		height: '100%',
		width: '100%',
		borderRadius: 120,
	},
	profileText: {
		alignSelf: 'center',
		marginHorizontal: 5,
		marginVertical: 15,
	},
	switchPageContainer: {
		flexDirection: 'row',
		marginTop: 10,
		position: 'relative',
		justifyContent: 'center',
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
