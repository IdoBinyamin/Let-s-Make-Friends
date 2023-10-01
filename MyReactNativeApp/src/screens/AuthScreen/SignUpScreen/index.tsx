import React, {
	useEffect,
	useState,
} from 'react';
import {
	Image,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	askForPermission,
	pickImage,
} from '../../../../util';
import { Input } from '../../../commponents/Generic';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
	addUserInfo,
	signup,
} from '../../../../config/FirebaseConfig';

export const SignUp = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [photoURL, setPhotoURL] =
		useState<string>('');
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
			} catch (error) {
				console.log(error);
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
				console.log(error);
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
		try {
			await signup({
				email,
				password,
				name,
				photoURL,
			});
			addUserInfo({
				name: name,
				email: email.toLowerCase(),
				photoURL: photoURL,
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
		}
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={styles.container}
		>
			<View style={{ flex: 0.4 }}>
				<TouchableOpacity
					onPress={
						profilePictureHandler
					}
					style={{
						marginVertical: 10,
						borderRadius: 120,
						borderColor: '#2CE4C5',
						borderWidth: 2,
						width: 120,
						height: 120,
						backgroundColor:
							'#EBEBEB',
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
					}}
				>
					{!photoURL ? (
						<FontAwesome
							size={120}
							color={'white'}
							name="plus"
						/>
					) : (
						<Image
							source={{
								uri: photoURL,
							}}
							style={{
								height: '100%',
								width: '100%',
								borderRadius: 120,
							}}
						/>
					)}
				</TouchableOpacity>
				<Text>Add a profile pic</Text>
			</View>

			<View
				style={{
					flex: 0.2,
				}}
			>
				<Input
					placeholder="Type your name"
					value={name}
					onChangeText={setName}
					keyboardType="default"
				/>
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
						Already have an acount?
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(
								'Login'
							)
						}
					>
						<Text
							style={{
								color: '#2CE4C5',
								fontWeight: '600',
								fontSize: 14,
							}}
						>
							Signin
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<TouchableOpacity
				onPress={registerHandler}
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
