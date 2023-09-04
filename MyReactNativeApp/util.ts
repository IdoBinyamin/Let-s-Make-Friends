// import 'react-native-get-random-values';
import * as ImagePicker from 'expo-image-picker';

import {
	FIREBASE_STORAGE,
	USERS_REF,
} from './FirebaseConfig';

export async function pickImage() {
	let result =
		await ImagePicker.launchCameraAsync();
	return result;
}

export async function askForPermission() {
	const { status } =
		await ImagePicker.requestCameraPermissionsAsync();

	return status;
}

export const uploadImage = async (
	uri: any,
	path: any,
	fName: any
) => {};