// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	getReactNativePersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	initializeAuth,
} from 'firebase/auth';
import {
	collection,
	getDocs,
	getFirestore,
	addDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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

export function addUserInfo(userInfo: {}) {
	const collectionName = 'users';
	const colRef = collection(
		FIREBASE_DB,
		`${collectionName}`
	);
	addDoc(colRef, userInfo).then(() => {
		alert('You ar all set!');
	});
}
export function getUserInfo(userInfo: {}) {
	const collectionName = 'users';
	const colRef = collection(
		FIREBASE_DB,
		`${collectionName}`
	);
	getDocs(colRef)
		.then((snapshot) => {
			let loggedUser = snapshot.docs.filter(
				(doc) => {
					return (
						userInfo.id === doc.uid
					);
				}
			);
			console.log('We got the user');
			return loggedUser;
		})
		.catch((e) => {
			console.log(e);
		});
	return;
}
