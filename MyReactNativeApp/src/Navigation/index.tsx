import React from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { Authetication } from '../commponents/authentication/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';
import { Button } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { Entypo } from '@expo/vector-icons';
import { Contacts } from '../screens/index';
import Chat from '../commponents/Chat';
import { ChatHeader } from '../screens/ChatHeader';
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
									<>
										<Entypo
											name="retweet"
											size={
												20
											}
											color="blue"
										/>
										<Button
											title="logout"
											onPress={
												doLogout
											}
										/>
									</>
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
						options={{
							headerTitle: (
								props
							) => (
								<ChatHeader
									{...props}
								/>
							),
						}}
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
