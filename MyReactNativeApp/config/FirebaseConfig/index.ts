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
	SignUpProps,
} from './FirebaseTypes';
import {
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGEING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
} from '@env';


const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGEING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};
// const firebaseConfig = {
// 	apiKey: 'AIzaSyD49SzibpIW2y_21ySSYdfg_6bpE-qxU9k',
// 	authDomain: 'rnexpo-ts.firebaseapp.com',
// 	databaseURL:
// 		'https://rnexpo-ts-default-rtdb.europe-west1.firebasedatabase.app',
// 	projectId: 'rnexpo-ts',
// 	storageBucket: 'rnexpo-ts.appspot.com',
// 	messagingSenderId: '741091590325',
// 	appId: '1:741091590325:web:164703e900fe0637ec3efc',
// 	measurementId: 'G-9JHJ1236JX',
// };

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



