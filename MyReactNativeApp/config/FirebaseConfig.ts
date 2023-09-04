// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
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
	let users: any[] = [];
	const colRef = collection(
		FIREBASE_DB,
		`${collectionName}`
	);
	getDocs(colRef)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				users.push({
					...doc.data(),
					id: doc.id,
				});
			});
			console.log('We got the users');
		})
		.catch((e) => {
			console.log(e);
		});
}
