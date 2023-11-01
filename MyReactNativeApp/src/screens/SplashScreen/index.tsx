import {
	View,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import SkillzLogo from '../../../assets/Svg/Skillz Icon.svg';
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
} from '../../../config/FirebaseConfig';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { SET_USER } from '../../store/Actions/userActions';
import { useNavigation } from '@react-navigation/native';
import { RouterProps } from '../../models';

export const SplashScreen = () => {
	const Navigation =
		useNavigation<RouterProps>();
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		checkLoggedUser();
	}, []);

	const checkLoggedUser = async () => {
		FIREBASE_AUTH.onAuthStateChanged(
			(userCred) => {
				if (userCred?.uid) {
					getDoc(
						doc(
							FIREBASE_DB,
							'users',
							userCred?.uid
						)
					)
						.then((docSnap) => {
							if (
								docSnap.exists()
							) {
								// console.log(
								// 	'user data: ',
								// 	docSnap.data()
								// );

								dispatch(
									SET_USER(
										docSnap.data()
									)
								);
							}
						})
						.then(() => {
							setTimeout(() => {
								return Navigation.navigate(
									'InsideLayout'
								);
							}, 2000);
						});
				} else {
					return Navigation.navigate(
						'AuthScreen'
					);
				}
			}
		);
	};

	return (
		<View style={styles.container}>
			<SkillzLogo
				width={360}
				height={640}
			/>
			<ActivityIndicator
				size={'large'}
				color={'white'}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2CE4C5',
	},
});
