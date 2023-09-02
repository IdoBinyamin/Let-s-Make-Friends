import React, { useContext } from 'react';
import {
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../../context/AuthContext';

export const Login = () => {
	const {
		email,
		password,
		loading,
		emailChangeHandler,
		passwordChangeHandler,
		loadingChangeHandler,
	} = useContext(AuthContext);
	const auth = FIREBASE_AUTH;

	const signIn = async () => {
		loadingChangeHandler(true);
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
			loadingChangeHandler(false);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<TextInput
					value={email}
					style={styles.input}
					placeholder="Email"
					autoCapitalize="none"
					onChangeText={(text) =>
						emailChangeHandler(text)
					}
				/>
				<TextInput
					secureTextEntry={true}
					value={password}
					style={styles.input}
					placeholder="Password"
					autoCapitalize="none"
					onChangeText={(text) =>
						passwordChangeHandler(
							text
						)
					}
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
		flex: 0.8,
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
