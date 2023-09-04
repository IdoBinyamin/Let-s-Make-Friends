import React, { useState } from 'react';
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
import { Profile } from '../profile';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('SignUp');

	const handleAuthentication = async () => {
		if (mode === 'SignUp') {
			<Profile />;
			await signup({ email, password });
		}
		if (mode === 'Signin') {
			// console.log('sigin');
			await signin({ email, password });
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
			<Image
				source={require('../../../assets/icon.png')}
				style={{
					height: 180,
					width: 180,
				}}
				resizeMode="cover"
			/>
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
