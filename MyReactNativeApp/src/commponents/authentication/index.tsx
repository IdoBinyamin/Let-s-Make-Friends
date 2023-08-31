import React, { useState } from 'react';
import {
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../../config/FirebaseConfig';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { Input } from '../Generic';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = FIREBASE_AUTH;

	const signIn = async () => {
		setLoading(true);
		try {
			const response =
				await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
			console.log(response);
		} catch (error: any) {
			console.log(error);
			alert(
				'Sign in failed: ' + error.message
			);
		} finally {
			setLoading(false);
		}
	};

	const signUp = async () => {
		setLoading(true);
		try {
			const response =
				await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
			console.log(response);
			alert('Check your emails!');
		} catch (error: any) {
			console.log(error);
			alert(
				'Sign up failed: ' + error.message
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<Input
					value={email}
					placeholder="Email"
					autoCapitalize="none"
					onChangeText={(
						text: string
					) => setEmail(text)}
				/>
				<Input
					secureTextEntry={true}
					value={password}
					placeholder="Password"
					autoCapitalize="none"
					onChangeText={(
						text: string
					) => setPassword(text)}
				/>
				{loading ? (
					<ActivityIndicator
						size={'large'}
						color={'#0000ff'}
					/>
				) : (
					<View>
						<Button
							title="Login"
							onPress={signIn}
						/>
						<Button
							title="SignUp"
							onPress={signUp}
						/>
					</View>
				)}
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		justifyContent: 'center',
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