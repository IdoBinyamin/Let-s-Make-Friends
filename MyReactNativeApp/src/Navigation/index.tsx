import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';
import {
	Text,
	TouchableOpacity,
} from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { AuthNavigation } from './AuthNavigation';
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
								<TouchableOpacity
									style={{
										marginRight: 10,
										flexDirection:
											'row',
									}}
									onPress={
										doLogout
									}
								>
									<Text
										style={{
											color: 'red',
											alignSelf:
												'center',
										}}
									>
										Logout
									</Text>
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
								</TouchableOpacity>
							);
						},
					}}
				/>
			) : (
				<Stack.Screen
					name="AuthNavigation"
					component={AuthNavigation}
					options={{
						headerShown: false,
					}}
				/>
			)}
		</Stack.Navigator>
	);
};
