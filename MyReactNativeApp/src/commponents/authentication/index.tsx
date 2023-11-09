import React, {
	useEffect,
	useState,
} from 'react';
import {
	LoginScreen,
	SignUpScreen,
} from '../../screens';
import {
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	ActivityIndicator,
	Keyboard,
	View,
	Platform,
} from 'react-native';

import {
	askForPermission,
	pickImage,
} from '../../../util';
import {
	signin,
	signup,
} from '../../../config/FirebaseConfig';
import { styles } from './Style';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState(true);

	const [photoURL, setPhotoURL] =
		useState<string>('');
	const [isLoading, setIsLoading] =
		useState(false);
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
			} catch (error: Error) {
				console.log(error.message);
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
				console.log(error.message);
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
		Keyboard.dismiss();
		setIsLoading(true);
		try {
			await signup({
				email,
				password,
				name,
				photoURL,
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
			setIsLoading(false);
		}
	};

	const updateMode = () => {
		setMode(!mode);
	};

	const signinHandler = async () => {
		setIsLoading(true);
		Keyboard.dismiss();
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
		setTimeout(() => {
			setIsLoading(false);
		}, 4000);
	};
	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={styles.container}
		>
			<View
				style={[
					Platform.OS === 'android'
						? styles.androidContainer
						: styles.iosContainer,
				]}
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
			</View>
			{!isLoading ? (
				<TouchableOpacity
					onPress={
						mode
							? signinHandler
							: registerHandler
					}
					style={[
						Platform.OS === 'android'
							? styles.androidInOrUpBtn
							: styles.iosInOrUpBtn,
					]}
				>
					<Text
						style={
							styles.inOrUpBtnText
						}
					>
						{mode
							? 'Sign In'
							: 'Apply'}
					</Text>
				</TouchableOpacity>
			) : (
				<ActivityIndicator
					size={'large'}
					color={'black'}
					style={[
						Platform.OS === 'android'
							? styles.androidLoading
							: styles.iosLoading,
					]}
				/>
			)}
		</KeyboardAvoidingView>
	);
};

