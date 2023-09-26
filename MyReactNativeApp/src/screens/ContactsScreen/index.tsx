import {
	FlatList,
	StyleSheet,
} from 'react-native';
import React, {
	useContext,
	useEffect,
	useState,
} from 'react';
import useContacts from '../../hooks/useHooks';
import { ChatContext } from '../../../context';
import {
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import {
	FIREBASE_AUTH,
	USERS_COL,
} from '../../../config/FirebaseConfig';
import { ListItem } from '../../commponents/Generic';
import { useRoute } from '@react-navigation/native';

type ContactProps = {
	email: string;
	name: string;
	permissionStatus: string;
	photoURL: string;
};

export function Contacts() {
	const { currentUser } = FIREBASE_AUTH;
	const contacts = useContacts();
	const fillteredContacts = contacts.filter(
		(contact: ContactProps) =>
			contact.email !== currentUser?.email
	);

	const route = useRoute();
	const image =
		route.params && route.params.image;
	return (
		<FlatList
			style={{ flex: 1, padding: 10 }}
			data={fillteredContacts}
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
	image: string;
}) {
	const { unfilteredRooms } =
		useContext(ChatContext);
	const [user, setUser] = useState(contact);
	const { currentUser } = FIREBASE_AUTH;
	useEffect(() => {
		const q = query(
			USERS_COL,
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

	const room = unfilteredRooms.find((room) =>
		room.participantsArray.includes(
			contact.item.email
		)
	);
	// console.log('room: ', room);
	console.log('user: ', user.item);

	return (
		<ListItem
			style={styles.container}
			type={'contacts'}
			user={user.item}
			image={image}
			room={room}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 7,
	},
});
