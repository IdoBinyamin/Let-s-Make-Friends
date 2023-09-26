// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getReactNativePersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	initializeAuth,
	updateProfile,
} from 'firebase/auth';
import {
	collection,
	getFirestore,
	addDoc,
	setDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProps = {
	email: string;
	password: string;
};
type SignUpProps = {
	email: string;
	password: string;
	name: string;
	photoURL: string;
};

type UserInfoProps = {
	name: string;
	email: string;
	photoURL: string;
	permissionStatus: string;
};

type RoomProps = {
	participants: any[];
	participantsArray: string[];
	roomId: string;
};

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

export const FIREBASE_AUTH = initializeAuth(
	FIREBASE_APP,
	{
		persistence:
			getReactNativePersistence(
				AsyncStorage
			),
	}
);

export const FIREBASE_DB =
	getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE =
	getStorage(FIREBASE_APP);

export const USERS_COL = collection(
	FIREBASE_DB,
	'users'
);
export const ROOMS_COL = collection(
	FIREBASE_DB,
	'rooms'
);

export async function signin({
	email,
	password,
}: AuthProps) {
	return signInWithEmailAndPassword(
		FIREBASE_AUTH,
		email,
		password
	);
}
export async function signup({
	email,
	password,
	name,
	photoURL,
}: SignUpProps) {
	return createUserWithEmailAndPassword(
		FIREBASE_AUTH,
		email,
		password
	)
		.then((userCredential) => {
			const user = userCredential.user;
			updateProfile(user, {
				displayName: name,
				photoURL: photoURL
					? photoURL
					: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
			}).catch((error) => {
				alert(error.message);
			});
		})
		.catch((error) => {
			const errorMessage = error.message;
			alert(errorMessage);
		});
}

export async function addUserInfo(
	userInfo: UserInfoProps
) {
	addDoc(USERS_COL, userInfo).then(() => {
		alert('Welcome!');
	});
}

export const addRoom = async (
	roomProps: RoomProps,
	ROOM_REF: any
) => {
	try {
		// Use the updateDoc function to update the document.
		await setDoc(ROOM_REF, roomProps);
	} catch (error: any) {
		console.error(
			'Error checking/creating room:',
			error.message
		);
	}
};
