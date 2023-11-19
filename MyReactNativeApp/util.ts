// import 'react-native-get-random-values';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_AUTH } from './config/FirebaseConfig';

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
export const doLogout = () => {
	FIREBASE_AUTH.signOut();
};

export const formatDate = (timestamp) => {
	const now = new Date();
	const date = new Date(timestamp);
	const timeDifference = now - date;
	const seconds = Math.floor(
		timeDifference / 1000
	);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (minutes < 60) {
		return `${minutes} minutes ago`;
	} else if (hours < 24) {
		return `${hours} hours ago`;
	} else if (days <= 7) {
		return `${days} days ago`;
	} else {
		// Display the date for timestamps older than 7 days
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		return date.toLocaleDateString(
			undefined,
			options
		);
	}
};

		
		
