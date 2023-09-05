import {
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, {
	useContext,
	useEffect,
	useState,
} from 'react';
import useContacts from '../../hooks/useHooks';
import { ChatContext } from '../../../context/ChatContext';
import {
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import { ListItem } from '../../commponents/Generic';
import { useRoute } from '@react-navigation/native';

export function Contacts() {
	const contacts = useContacts();
	const route = useRoute();
	const image =
		route.params && route.params.image;
	return (
		<FlatList
			style={{ flex: 1, padding: 10 }}
			data={contacts}
			keyExtractor={(_, i) => i.toString()}
			renderItem={(item) => (
				<ContactPriview
					contact={item}
					image={image}
				/>
			)}
		/>
	);
}

function ContactPriview({
	contact,
	image,
}: {
	contact: any;
	image: any;
}) {
	const { rooms } = useContext(ChatContext);
	const [user, setUser] = useState(contact);
	useEffect(() => {
		const colRef = collection(
			FIREBASE_DB,
			`users`
		);
		const q = query(
			colRef,
			where('email', '==', contact.item)
		);

		getDocs(q)
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					const userDoc =
						querySnapshot.docs[0].data();
					setUser((prevUser: any) => ({
						...prevUser,
						userDoc,
					}));
				}
			})
			.catch((error) => {
				console.error(
					'Error fetching user data:',
					error
				);
			});
	}, [contact.item.email]);

	const room = rooms.find((room) =>
		room.participantsArray.includes(
			contact.item.email
		)
	);

	return (
		<ListItem
			style={{ marginTop: 7 }}
			type={'contacts'}
			user={user}
			image={image}
			room={room}
		/>
	);
}

const styles = StyleSheet.create({});
