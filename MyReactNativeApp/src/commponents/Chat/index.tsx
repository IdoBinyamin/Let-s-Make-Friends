//@refresh reset
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { useRoute } from '@react-navigation/native';
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
} from '../../../config/FirebaseConfig';
import {
	collection,
	doc,
	setDoc,
} from 'firebase/firestore';

const randomId = nanoid();

export default function Chat() {
	const { currentUser } = FIREBASE_AUTH;
	const route = useRoute();
	const room = route.params?.room;
	const selectedImage = route.params?.image;
	const userB = route.params?.user.item;
	const senderUser = currentUser?.photoURL
		? {
				name: currentUser.displayName,
				_id: currentUser.uid,
				avatar: currentUser.photoURL,
		  }
		: {
				name: currentUser?.displayName,
				_id: currentUser?.uid,
		  };
	const roomId = room ? room.id : randomId;
	const roomRef = doc(
		FIREBASE_DB,
		'rooms',
		roomId
	);
	const roomMessagesRef = collection(
		FIREBASE_DB,
		'rooms',
		roomId,
		'message'
	);
	useEffect(() => {
		async () => {
			if (!room) {
				const currentUserData = {
					displayName:
						currentUser?.displayName,
					email: currentUser?.email,
				};
				if (currentUser?.photoURL) {
					currentUserData.photoURL =
						currentUser.photoURL;
				}
				const userBData = {
					displayName:
						userB?.contactName ||
						userB.displayName ||
						'',
					email: userB.item.email,
				};
				if (userB?.photoURL) {
					userBData.photoURL =
						userB.photoURL;
				}
				const roomData = {
					participants: [
						currentUserData,
						userBData,
					],
					participantsArray: [
						currentUser?.email,
						userB.email,
					],
				};
				try {
					await setDoc(
						roomRef,
						roomData
					);
				} catch (error: any) {
					console.log(error.message);
				}
			}
		};
	}, []);

	return (
		<View>
			<Text>Chat</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
