import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
	Home,
	Profile,
	Chat,
} from '../../screens';

const Tab = createBottomTabNavigator();

export const InsideLayout = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
			/>
			<Tab.Screen
				name="Chat"
				component={Chat}
			/>
		</Tab.Navigator>
	);
};
