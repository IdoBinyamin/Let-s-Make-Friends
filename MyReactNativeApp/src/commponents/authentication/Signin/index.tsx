import React, { useState } from 'react';
import {
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthInputs } from '../../Generic';

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

	const updateEmail = (text: string) => {
		setEmail(text);
	};
	const updatePassword = (text: string) => {
		setPassword(text);
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<AuthInputs
					email={email}
					password={password}
					setEmail={updateEmail}
					setPassword={updatePassword}
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
