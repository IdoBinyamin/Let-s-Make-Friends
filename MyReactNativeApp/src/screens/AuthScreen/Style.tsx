import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	iosContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	androidContainer: {
		flex: 1,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},

	iosInOrUpBtn: {
		height: 48,
		width: 296,
		borderColor: '#2CE4C5',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#2CE4C5',
		background:
			'transparent linear-gradient(26deg, #06DBDB 0%, #2CE4C5 100%) 0% 0% no-repeat padding-box',
		shadowColor: '#1FE1CC',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.8,
		shadowRadius: 20,
		borderRadius: 5,
		opacity: 1,
		marginBottom: 30,
	},
	androidInOrUpBtn: {
		marginTop: 730,
		height: 48,
		width: 296,
		borderColor: '#2CE4C5',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#2CE4C5',
		background:
			'transparent linear-gradient(26deg, #06DBDB 0%, #2CE4C5 100%) 0% 0% no-repeat padding-box',
		shadowColor: '#1FE1CC',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.8,
		shadowRadius: 20,
		borderRadius: 5,
		opacity: 1,
	},
	inOrUpBtnText: {
		color: 'white',
		fontSize: 20,
	},
	iosLoading: {
		marginBottom: 100,
	},
	androidLoading: {
		marginTop: 700,
	},
});
