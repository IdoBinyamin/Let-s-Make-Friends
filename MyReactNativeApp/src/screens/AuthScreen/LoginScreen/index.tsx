import React, { useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Input } from '../../../commponents/Generic';
import { signin } from '../../../../config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
// import Icon from './assets/unknown-user.svg';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();

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
			<View>
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
				/>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 10,
					}}
				>
					<Text
						style={{
							color: 'gray',
							fontWeight: '600',
							fontSize: 14,
						}}
					>
						Dont have an acount?
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(
								'SignUp'
							)
						}
					>
						<Text
							style={{
								fontWeight: '600',
								fontSize: 14,
								color: '#2CE4C5',
							}}
						>
							Sign-up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				onPress={signinHandler}
				style={{
					height: 48,
					width: 296,
					borderColor: '#2CE4C5',
					borderWidth: 1,
					marginTop: 230,
					justifyContent: 'center',
					alignItems: 'center',
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
				}}
			>
				<Text
					style={{
						color: 'white',
						fontSize: 20,
					}}
				>
					Apply
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
});
