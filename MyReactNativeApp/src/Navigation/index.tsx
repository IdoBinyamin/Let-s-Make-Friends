import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { Auth } from '../commponents/authentication/index';
import {
	ProfileScreen,
	SplashScreen,
} from '../screens';

import { AntDesign } from '@expo/vector-icons';
import { AddNewChat } from '../commponents/Chat/NewChat';
import { ChatScreen } from '../screens';
import lengConfig from '../comons/leng';
import { TopButton } from '../consts/TopButton';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
	const doLogout = () => {
		FIREBASE_AUTH.signOut();
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
					gestureEnabled: false,
					headerTitle: '',
					headerRight: () => {
						return (
							<TopButton
								onPress={doLogout}
								textStyle={{
									color: 'red',
									alignSelf:
										'center',
								}}
								image={
									<AntDesign
										name="logout"
										size={24}
										color={
											'red'
										}
										style={{
											marginLeft: 10,
										}}
									/>
								}
							/>
						);
					},
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
