import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
	Home,
	Profile,
	Chat,
} from '../../screens';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const InsideLayout = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Entypo
							name="home"
							size={20}
							color={'black'}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Entypo
							name="user"
							size={20}
							color={'black'}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Chat"
				component={Chat}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Entypo
							name="chat"
							size={20}
							color={'black'}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
