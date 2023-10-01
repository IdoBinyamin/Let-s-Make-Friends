import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, SignUp } from '../../screens';

const Stack = createNativeStackNavigator();

export const AuthNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};
