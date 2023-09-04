import React, {
	useState,
	useEffect,
} from 'react';
import {
	View,
	Text,
	Button,
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
	pickImage,
	askForPermission,
	uploadImage,
} from '../../../util';
import {
	FIREBASE_AUTH,
	addPicture,
} from '../../../config/FirebaseConfig';

export const Profile = () => {
	const [selectedImage, setSelectedImage] =
		useState<string>('');
	const [
		permissionStatus,
		setPermissionStatus,
	] = useState<any>(null);
	const [displayName, setDisplayName] =
		useState('');

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

	async function handlePress() {
		const user = FIREBASE_AUTH.currentUser;
		try {
			addPicture(selectedImage);
		} catch (error: any) {
			console.log(error.message);
		}
	}

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

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				padding: 20,
			}}
		>
			<Text
				style={{
					fontSize: 24,
					color: 'blue',
				}}
			>
				Profile info
			</Text>
			<Text
				style={{
					fontSize: 14,
					color: 'blue',
					marginTop: 20,
				}}
			>
				Please provide your name and an
				optional profile photo
			</Text>
			<TouchableOpacity
				onPress={profilePictureHandler}
				style={{
					marginTop: 30,
					borderRadius: 120,
					width: 120,
					height: 120,
					backgroundColor: 'gray',
					alignItems: 'center',
					justifyContent: 'center',
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
				onChangeText={setDisplayName}
				keyboardType="default"
				style={{
					borderBottomWidth: 2,
					borderBottomColor: 'blue',
					width: '100%',
					marginTop: 40,
				}}
			/>
			<View
				style={{
					marginTop: 'auto',
					width: 80,
				}}
			>
				<Button
					title="Next"
					color={'blue'}
					onPress={handlePress}
					disabled={!displayName}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};