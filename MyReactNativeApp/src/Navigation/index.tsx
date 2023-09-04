import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { Authetication } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';
import { Button, View } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { Entypo } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();

export const MainNavigator = ({
	user,
}: UserModel) => {
	const doLogout = () => {
		FIREBASE_AUTH.signOut();
	};
	return (
		<Stack.Navigator>
			{user ? (
				<Stack.Screen
					name="InsideLayout"
					component={InsideLayout}
					options={{
						headerTitle: '',
						headerRight: () => {
							return (
								<>
									<Entypo
										name="retweet"
										size={20}
										color="blue"
									/>
									<Button
										title="logout"
										onPress={
											doLogout
										}
									/>
								</>
							);
						},
					}}
				/>
			) : (
				<Stack.Screen
					name="Authetication"
					component={Authetication}
					options={{
						headerShown: false,
					}}
				/>
			)}
		</Stack.Navigator>
	);
};
