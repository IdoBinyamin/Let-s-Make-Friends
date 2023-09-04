import React, {
	useState,
	useEffect,
} from 'react';
import {
	Button,
	Image,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	signin,
	signup,
} from '../../../config/FirebaseConfig';
import {
	askForPermission,
	pickImage,
} from '../../../util';
import { Entypo } from '@expo/vector-icons';

export const Authetication = ({}: any) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('SignUp');
	const [selectedImage, setSelectedImage] =
		useState<string>('');
	const [displayName, setDisplayName] =
		useState('');
	const [
		permissionStatus,
		setPermissionStatus,
	] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				const status =
					await askForPermission();
				setPermissionStatus(status);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	const handleAuthentication = async () => {
		if (mode === 'SignUp') {
			try {
				await signup({ email, password });
			} catch (error: any) {
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
		}
		if (mode === 'Signin') {
			try {
				// console.log('sigin');
				await signin({ email, password });
			} catch (error: any) {
				console.log(error.message);
				if (
					error.message ===
					'Firebase: Error (auth/user-not-found).'
				) {
					alert(
						'Register first please'
					);
				}
			}
		}
	};

	const profilePictureHandler = async () => {
		try {
			const result = await pickImage();
			if (!result.canceled) {
				setSelectedImage(result.uri);
			}
		} catch (error: any) {
			console.log(error);
		}

		if (!permissionStatus) {
			return <Text>Loading</Text>;
		}
		if (permissionStatus !== 'granted') {
			return (
				<Text>
					You must need to allow the app
					using camera and microphon
				</Text>
			);
		}
	};

	const modeHandler = async () => {
		mode === 'SignUp'
			? setMode('Signin')
			: setMode('SignUp');
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={styles.container}
		>
			<Text
				style={{
					color: 'blue',
					fontSize: 24,
					marginBottom: 20,
				}}
			>
				Welcome to My App
			</Text>

			{mode === 'SignUp' && (
				<>
					<Text
						style={{
							fontSize: 14,
							color: 'blue',
							marginTop: 20,
						}}
					>
						Please provide your name
						and an optional profile
						photo
					</Text>
					<TouchableOpacity
						onPress={
							profilePictureHandler
						}
						style={{
							marginVertical: 30,
							borderRadius: 120,
							width: 120,
							height: 120,
							backgroundColor:
								'gray',
							justifyContent:
								'center',
							alignItems: 'center',
						}}
					>
						{!selectedImage ? (
							<Entypo
								size={45}
								color={'white'}
								name="camera"
							/>
						) : (
							<Image
								source={{
									uri: selectedImage,
								}}
								style={{
									height: '100%',
									width: '100%',
									borderRadius: 120,
								}}
							/>
						)}
					</TouchableOpacity>
					<TextInput
						placeholder="Type your name"
						value={displayName}
						onChangeText={
							setDisplayName
						}
						keyboardType="default"
						style={{
							borderBottomWidth: 2,
							borderBottomColor:
								'blue',
							width: 200,
						}}
					/>
				</>
			)}
			<View style={{ marginTop: 20 }}>
				<TextInput
					placeholder="email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					style={{
						borderBottomWidth: 2,
						borderBottomColor: 'blue',
						width: 200,
					}}
				/>
				<TextInput
					placeholder="password"
					value={password}
					onChangeText={setPassword}
					keyboardType="visible-password"
					secureTextEntry={true}
					style={{
						borderBottomWidth: 2,
						borderBottomColor: 'blue',
						width: 200,
						marginTop: 20,
					}}
				/>
				<View>
					<Button
						color={'green'}
						disabled={
							!password || !email
						}
						title={
							mode === 'SignUp'
								? 'Sign-Up'
								: 'Log-in'
						}
						onPress={
							handleAuthentication
						}
					/>
				</View>
				<TouchableOpacity
					style={{ marginTop: 15 }}
					onPress={modeHandler}
				>
					<Text>
						{mode === 'SignUp'
							? 'Already have an acount? Sign in'
							: 'Dont have an acount? Sign Up'}
					</Text>
				</TouchableOpacity>
			</View>
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
	input: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff',
	},
});
