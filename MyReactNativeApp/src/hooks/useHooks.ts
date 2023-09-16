import React, {
	useState,
	useEffect,
} from 'react';
import * as Contacts from 'expo-contacts';
import { getDocs } from 'firebase/firestore';
import { USERS_COL } from '../../config/FirebaseConfig';

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
		} catch (error: Error) {
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
				const querySnapshot =
					await getDocs(USERS_COL);
				const contactsData: [] = [];

				querySnapshot.forEach((doc) => {
					const data = doc.data();
					// Map Firebase data to desired contact format
					const contact: {
						contactName: string;
						email: string;
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
		// console.log('data: ', data);

		return {
			contactName: data.name,
			email: data.email,
			photoURL: data.photoURL,
			// Add other contact properties as needed
		};
	};

	return contacts;
}
