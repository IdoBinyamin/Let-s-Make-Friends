import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
	Home,
	Profile,
	Chat,
} from '../../screens';
import { Camera } from '../../screens/CameraScreen';

const Tab = createBottomTabNavigator();

export const InsideLayout = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Chat"
				component={Chat}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Camera"
				component={Camera}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};
