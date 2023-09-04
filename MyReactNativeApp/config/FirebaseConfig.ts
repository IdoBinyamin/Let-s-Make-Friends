// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
	collection,
	getDocs,
	getFirestore,
} from 'firebase/firestore';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
	email: string;
	password: string;
}

const firebaseConfig = {
	apiKey: 'AIzaSyD49SzibpIW2y_21ySSYdfg_6bpE-qxU9k',
	authDomain: 'rnexpo-ts.firebaseapp.com',
	projectId: 'rnexpo-ts',
	storageBucket: 'rnexpo-ts.appspot.com',
	messagingSenderId: '741091590325',
	appId: '1:741091590325:web:d83c70b20c63fc13ec3efc',
	measurementId: 'G-K392XGKS61',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(
	firebaseConfig
);
export const FIREBASE_AUTH =
	getAuth(FIREBASE_APP);
export const FIREBASE_DB =
	getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE =
	getStorage(FIREBASE_APP);

const collectionName = 'users';
const colRef = collection(
	FIREBASE_DB,
	`${collectionName}`
);

// getDocs(colRef)
// 	.then((snapshot) => {
// 		let users = [];
// 		snapshot.docs.forEach((doc) => {
// 			user.push({
// 				...doc.data(),
// 				id: doc.id,
// 			});
// 		});

// 		console.log(users);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

export function signin({
	email,
	password,
}: AuthProps) {
	return signInWithEmailAndPassword(
		FIREBASE_AUTH,
		email,
		password
	);
}
export function signup({
	email,
	password,
}: AuthProps) {
	return createUserWithEmailAndPassword(
		FIREBASE_AUTH,
		email,
		password
	);
}

export function addPicture(imageName: any) {
	// Create the file metadata
	const metadata = {
		contentType: imageName,
	};

	// Upload file and metadata to the object 'images/mountains.jpg'
	const storageRef = ref(
		FIREBASE_STORAGE,
		imageName
	);

	return;
	const uploadTask = uploadBytesResumable(
		storageRef,
		imageName,
		metadata
	);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(
		'state_changed',
		(snapshot) => {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress =
				(snapshot.bytesTransferred /
					snapshot.totalBytes) *
				100;
			console.log(
				'Upload is ' + progress + '% done'
			);
			switch (snapshot.state) {
				case 'paused':
					console.log(
						'Upload is paused'
					);
					break;
				case 'running':
					console.log(
						'Upload is running'
					);
					break;
			}
		},
		(error) => {
			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case 'storage/unauthorized':
					// User doesn't have permission to access the object
					break;
				case 'storage/canceled':
					// User canceled the upload
					break;

				// ...

				case 'storage/unknown':
					// Unknown error occurred, inspect error.serverResponse
					break;
			}
		},
		() => {
			// Upload completed successfully, now we can get the download URL
			getDownloadURL(
				uploadTask.snapshot.ref
			).then((downloadURL) => {
				console.log(
					'File available at',
					downloadURL
				);
			});
		}
	);
}
