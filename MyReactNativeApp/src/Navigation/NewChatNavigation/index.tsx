import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NewChatScreen } from '../../screens/ChatScreen/NewChatScreens/NewChatScreen';
import { NewGroupScreen } from '../../screens/ChatScreen/NewChatScreens/NewGroupScreen';

type Props = {};
const Tab = createMaterialTopTabNavigator();

export const AddNewChat = (props: Props) => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="NewChatScreen"
				component={NewChatScreen}
			/>
			<Tab.Screen
				name="NewGroupScreen"
				component={NewGroupScreen}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({});
