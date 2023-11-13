import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 100,
		position: 'relative',
	},
	iconContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 15,
		top: 25,
		right: 0,
		height: 55,
		width: 55,
		borderWidth: 1,
		borderRadius: 60,
	},
	ownerImage: {
		height: 50,
		width: 50,
		borderRadius: 80,
	},
	descriptionContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginLeft: 15,
		height: '40%',
		flexDirection: 'column',
	},

	name: {
		position: 'relative',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#06DBDB',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	followBtnContainer: {
		width: 15,
		justifyContent: 'center',
	},
	titleText: {
		justifyContent: 'flex-end',
		fontSize: 15,
	},

	followBtn: {
		width: 90,
		backgroundColor: '#007FFF',
		borderColor: '#007FFF',
	},
	followText: {
		color: 'white',
	},
	unfollowBtn: {
		width: 100,
		backgroundColor: 'white',
		borderColor: '#007FFF',
	},
	unfollowText: {
		color: '#007FFF',
	},
});
