import React, {
	useEffect,
	useState,
} from 'react';
import {
	LoginScreen,
	SignUpScreen,
} from '../../screens';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';

import {
	askForPermission,
	pickImage,
} from '../../../util';
import {
	addUserInfo,
	signin,
	signup,
} from '../../../config/FirebaseConfig';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState(true);

	const [photoURL, setPhotoURL] =
		useState<string>('');
	const [name, setName] = useState('');
	const [
		permissionStatus,
		setPermissionStatus,
	] = useState<string>('');

	useEffect(() => {
		const premitionStatus = async () => {
			try {
				const status =
					await askForPermission();
				setPermissionStatus(status);
			} catch (error) {
				console.log(error);
			}
		};
		premitionStatus();
	}, []);

	const profilePictureHandler =
		async (): Promise<
			JSX.Element | undefined
		> => {
			try {
				const result = await pickImage();
				if (!result.canceled) {
					setPhotoURL(
						result.assets[0].uri
					);
				}
			} catch (error: Error) {
				console.log(error);
			}

			if (!permissionStatus) {
				return <Text>Loading</Text>;
			}
			if (permissionStatus !== 'granted') {
				return (
					<Text>
						You must need to allow the
						app using camera and
						microphon
					</Text>
				);
			}
		};

	const registerHandler = async () => {
		try {
			await signup({
				email,
				password,
				name,
				photoURL,
			});
			addUserInfo({
				name: name,
				email: email.toLowerCase(),
				photoURL: photoURL,
			});
		} catch (error: Error) {
			console.log(error.message);
			if (
				error.message ===
				'Firebase: Error (auth/email-already-in-use).'
			) {
				alert(
					'Exsist User please switch to Login'
				);
			}
		}
	};

	const updateMode = () => {
		setMode(!mode);
	};

	const signinHandler = async () => {
		try {
			await signin({ email, password });
		} catch (error: Error) {
			console.log(error.message);
			if (
				error.message ===
				'Firebase: Error (auth/user-not-found).'
			) {
				alert('Register first please');
			}
		}
	};
	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={styles.container}
		>
			{mode ? (
				<LoginScreen
					updateMode={updateMode}
					setEmail={setEmail}
					setPassword={setPassword}
					email={email}
					password={password}
				/>
			) : (
				<SignUpScreen
					updateMode={updateMode}
					setEmail={setEmail}
					setPassword={setPassword}
					setName={setName}
					profilePictureHandler={
						profilePictureHandler
					}
					name={name}
					email={email}
					password={password}
					photoURL={photoURL}
				/>
			)}
			<TouchableOpacity
				onPress={
					mode
						? signinHandler
						: registerHandler
				}
				style={styles.inOrUpBtn}
			>
				<Text
					style={styles.inOrUpBtnText}
				>
					{mode ? 'Sign In' : 'Apply'}
				</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	inOrUpBtn: {
		height: 48,
		width: 296,
		marginBottom: 90,
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
});
