import React from 'react';
import { View, Button } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

export const Profile = () => {
	return (
		<View>
			<Button
				title="Log-Out"
				onPress={() =>
					FIREBASE_AUTH.signOut()
				}
			/>
		</View>
	);
};
