import React, { useContext } from 'react';
import {
	ActivityIndicator,
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
} from '../../../config/FirebaseConfig';
import {
	createUserWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../../context/AuthContext';

export const Register = () => {
	const {
		username,
		email,
		password,
		loading,
		usernameChangeHandler,
		emailChangeHandler,
		passwordChangeHandler,
		loadingChangeHandler,
	} = useContext(AuthContext);
	const auth = FIREBASE_AUTH;

	const signUp = async () => {
		loadingChangeHandler(true);
		try {
			const response =
				await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
			console.log(response);
			createUserInfo(response);
			alert('Check your emails!');
		} catch (error: any) {
			console.log(error);
			alert(
				'Sign up failed: ' + error.message
			);
		} finally {
			loadingChangeHandler(false);
		}
	};
	const createUserInfo = async (
		user: UserCredential
	) => {
		try {
			const docRef = await setDoc(
				doc(
					FIREBASE_DB,
					`users/${user.user.uid}`
				),
				{
					username,
					email: user.user.email,
				}
			);
		} catch (error) {
			console.error(
				'There was an error creating user information: ',
				error
			);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<TextInput
					value={username}
					style={styles.input}
					placeholder="Username"
					autoCapitalize="none"
					onChangeText={(text) =>
						usernameChangeHandler(
							text
						)
					}
				/>
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
