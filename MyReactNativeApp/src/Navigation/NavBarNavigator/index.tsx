import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
	Feed,
	Profile,
	Chat,
	Upload,
	Board,
} from '../../screens';
import {
	Entypo,
	MaterialCommunityIcons,
	Octicons,
	FontAwesome5,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const InsideLayout = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<MaterialCommunityIcons
							name="account-group"
							size={20}
							color={'black'}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Skillz"
				component={Profile}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<FontAwesome5
							name="toolbox"
							size={20}
							color="black"
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Upload"
				component={Upload}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Octicons
							name="diff-added"
							size={20}
							color="black"
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Board"
				component={Board}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<MaterialCommunityIcons
							name="snowboard"
							size={20}
							color="black"
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
