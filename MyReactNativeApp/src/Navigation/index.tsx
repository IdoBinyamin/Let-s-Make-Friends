import React, {
	useEffect,
	useState,
} from 'react';
import { InsideLayout } from './NavBarNavigator/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from '../models';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { Auth } from '../commponents/authentication/index';
import {
	ProfileScreen,
	WelcomeScreen,
} from '../screens';
import {
	Text,
	TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();

export const MainNavigator = ({
	user,
}: UserModel) => {
	const [loading, setLoading] = useState(true);
	const doLogout = () => {
		FIREBASE_AUTH.signOut();
	};
	useEffect(() => {
		const timerId = setTimeout(() => {
			// Your action to be performed after 3 seconds
			setLoading(false);
			console.log(
				'Action performed after second'
			);
		}, 1000);

		// Cleanup function to clear the timer when the component is unmounted
		return () => clearTimeout(timerId);
	}, []);
	return (
		<Stack.Navigator>
			{loading && (
				<Stack.Screen
					name="Welcome"
					component={WelcomeScreen}
					options={{
						headerShown: false,
					}}
				/>
			)}
			{user ? (
				<>
					<Stack.Screen
						name="InsideLayout"
						component={InsideLayout}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="ProfileScreen"
						component={ProfileScreen}
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
											size={
												24
											}
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
				</>
			) : (
				<Stack.Screen
					name="AuthScreen"
					component={Auth}
					options={{
						headerShown: false,
					}}
				/>
			)}
		</Stack.Navigator>
	);
};
