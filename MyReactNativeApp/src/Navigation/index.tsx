import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { Authetication } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';

const Stack = createNativeStackNavigator();

export const MainNavigator = ({
	user,
}: UserModel) => {
	return (
		<Stack.Navigator>
			{user ? (
				<Stack.Screen
					name="InsideLayout"
					component={InsideLayout}
					options={{
						headerShown: false,
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
