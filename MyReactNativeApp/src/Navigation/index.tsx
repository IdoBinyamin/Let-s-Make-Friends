import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { Authetication } from '../commponents/authentication/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';
import { TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { Contacts } from '../screens/index';
import Chat from '../commponents/Chat';
import { ChatHeader } from '../screens/index';
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
				<>
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
										}}
										onPress={
											doLogout
										}
									>
										<AntDesign
											name="logout"
											size={
												24
											}
											color={
												'gray'
											}
											style={{
												marginRight: 10,
											}}
										/>
									</TouchableOpacity>
								);
							},
						}}
					/>
					<Stack.Screen
						name="contacts"
						component={Contacts}
						options={{
							headerTitle: '',
						}}
					/>
					<Stack.Screen
						name="chat"
						component={Chat}
					/>
				</>
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
