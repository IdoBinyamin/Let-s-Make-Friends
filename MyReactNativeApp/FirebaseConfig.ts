// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	initializeAuth,
	getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDmf0eALDO_sL4m2wR6w7GCjw3xw9O3UY8',
	authDomain:
		'reactnativeexpo-ts.firebaseapp.com',
	databaseURL:
		'https://reactnativeexpo-ts-default-rtdb.firebaseio.com',
	projectId: 'reactnativeexpo-ts',
	storageBucket:
		'reactnativeexpo-ts.appspot.com',
	messagingSenderId: '926541269351',
	appId: '1:926541269351:web:f372934d408281c571c7c2',
	measurementId: 'G-VHHH8JKNJ0',
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
