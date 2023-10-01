import React, {
	useState,
	useEffect,
} from 'react';
import {
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	addUserInfo,
	signin,
	signup,
} from '../../../config/FirebaseConfig';
import { askForPermission } from '../../../util';
import { Input } from '../Generic';

export const Authetication = ({}: any) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('Signin');
	const [photoURL, setPhotoURL] =
		useState<string>('');
	const [name, setName] = useState('');

	const handleAuthentication = async () => {
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

	const modeHandler = () => {
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

			<View style={{ marginTop: 20 }}>
				<Input
					placeholder="email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
				/>
				<Input
					placeholder="password"
					value={password}
					onChangeText={setPassword}
					keyboardType="visible-password"
					secureTextEntry={true}
					style={{
						marginTop: 20,
					}}
				/>
				<View>
					<Button
						color={'green'}
						disabled={
							mode === 'SignUp'
								? !password ||
								  !email ||
								  !photoURL
								: !password ||
								  !email
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
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					<Text
						style={{
							color: 'gray',
							fontWeight: '600',
							fontSize: 14,
						}}
					>
						{mode === 'SignUp'
							? 'Already have an acount? '
							: 'Dont have an acount? '}
					</Text>
					<TouchableOpacity
						onPress={modeHandler}
					>
						<Text
							style={{
								color: '#f57c00',
								fontWeight: '600',
								fontSize: 14,
							}}
						>
							{mode === 'SignUp'
								? 'Signin '
								: 'Sign-up'}
						</Text>
					</TouchableOpacity>
				</View>
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
