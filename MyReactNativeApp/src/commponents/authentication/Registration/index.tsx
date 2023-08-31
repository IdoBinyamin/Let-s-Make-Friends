import React, { useState } from 'react';
import {
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	View,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { AuthInputs } from '../../Generic';

export const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = FIREBASE_AUTH;

	const inputs = [
		{
			value: email,
			name: 'Email',
			autoCapitalize: 'none',
			onChangeText: (text: string) =>
				setEmail(text),
		},
		{
			secureTextEntry: true,
			value: password,
			name: 'Password',
			autoCapitalize: 'none',
			onChangeText: (text: string) =>
				setPassword(text),
		},
	];

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
				<AuthInputs
					email={email}
					password={password}
					setEmail={() => {
						setEmail;
					}}
					setPassword={() => {
						setPassword;
					}}
				/>
				{loading ? (
					<ActivityIndicator
						size={'large'}
						color={'#0000ff'}
					/>
				) : (
					<Button
						title="Sign Up"
						onPress={signUp}
					/>
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
