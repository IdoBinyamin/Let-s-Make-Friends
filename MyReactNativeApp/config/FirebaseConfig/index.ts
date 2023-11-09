// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getReactNativePersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	initializeAuth,
	UserCredential,
} from 'firebase/auth';
import {
	getFirestore,
	setDoc,
	doc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	AuthProps,
	RoomProps,
	SignUpProps,
} from './FirebaseTypes';

//TODO: move all Types to models files

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



export const signin = async ({
	email,
	password,
}: AuthProps): Promise<
	//לקרוא דוקומנטציה
	Partial<UserCredential & AuthProps>
> => {
	return signInWithEmailAndPassword(
		FIREBASE_AUTH,
		email,
		password
	);
};

export async function signup({
	email,
	password,
	name,
	photoURL,
}: SignUpProps) {
	return await createUserWithEmailAndPassword(
		FIREBASE_AUTH,
		email,
		password
	).then((userCredential) => {
		const user = userCredential.user;

		const data = {
			_id: user.uid,
			displayName: name,
			photoURL: photoURL
				? photoURL
				: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
			email: email,
		};
		setDoc(
			doc(FIREBASE_DB, 'users', user.uid),
			data
		).catch((error) => {
			alert(error.message);
		});
	});
}



