import React, {
	useState,
	useEffect,
} from 'react';
import * as Contacts from 'expo-contacts';
import { FIREBASE_DB } from '../../config/FirebaseConfig';
import {
	getDocs,
	collection,
} from 'firebase/firestore';

export default function useContacts() {
	const [contacts, setContacts] = useState([]);
	[];

	async function requestAndFetchContacts() {
		try {
			const { status } =
				await Contacts.requestPermissionsAsync();

			if (status === 'granted') {
				const firebaseContacts =
					await fetchContactsFromFirebase();

				if (firebaseContacts.length > 0) {
					setContacts(firebaseContacts);
				}
			}
		} catch (error: any) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		requestAndFetchContacts();
	}, []);
	// Function to fetch contacts from Firebase
	const fetchContactsFromFirebase =
		async () => {
			try {
				const contactsCollection =
					collection(
						FIREBASE_DB,
						'users'
					);
				const querySnapshot =
					await getDocs(
						contactsCollection
					);
				const contactsData: [] = [];

				querySnapshot.forEach((doc) => {
					const data = doc.data();
					// Map Firebase data to desired contact format
					const contact: {
						contactName: any;
						email: any;
					} =
						mapFirebaseDataToContact(
							data
						);
					contactsData.push(contact);
				});

				return contactsData;
			} catch (error) {
				console.error(
					'Error fetching contacts from Firebase:',
					error
				);
				return [];
			}
		};
	// Function to map Firebase data to desired contact format
	const mapFirebaseDataToContact = (
		data: any
	) => {
		return {
			contactName: data.name,
			email: data.email,
			// Add other contact properties as needed
		};
	};

	return contacts;
}
