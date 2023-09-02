import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { Authetication } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';
import { Button } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';

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
								<Button
									title="logout"
									onPress={
										doLogout
									}
								/>
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
