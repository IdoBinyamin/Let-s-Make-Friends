import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	CommentsScreen,
	ProfileScreen,
	SplashScreen,
	Auth,
} from '../screens';

import { AntDesign } from '@expo/vector-icons';
import { AddNewChat } from '../screens/ChatScreens/AddNewChat';
import { ChatScreen } from '../screens';
import lengConfig from '../comons/leng';
import { TopButton } from '../consts';
import { doLogout } from '../../util';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
	const headerRightHandler = () => {
		return (
			<TopButton
				onPress={doLogout}
				textStyle={{
					color: 'red',
					alignSelf: 'center',
				}}
				image={
					<AntDesign
						name="logout"
						size={24}
						color={'red'}
						style={{
							marginLeft: 10,
						}}
					/>
				}
			/>
		);
	};

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={
					lengConfig.screens
						.splashScreen
				}
				component={SplashScreen}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>

			<Stack.Screen
				name={
					lengConfig.screens
						.insideLayout
				}
				component={InsideLayout}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>

			<Stack.Screen
				name={
					lengConfig.screens
						.profileScreen
				}
				component={ProfileScreen}
				options={{
					headerTitle: 'My Profile',
					headerRight:
						headerRightHandler,
				}}
			/>

			<Stack.Screen
				name={lengConfig.screens.comments}
				component={CommentsScreen}
				options={{
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name={lengConfig.screens.chatRoom}
				component={ChatScreen}
				options={{
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name={
					lengConfig.screens.addNewChat
				}
				component={AddNewChat}
			/>

			<Stack.Screen
				name={
					lengConfig.screens.authScreen
				}
				component={Auth}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>
		</Stack.Navigator>
	);
};
