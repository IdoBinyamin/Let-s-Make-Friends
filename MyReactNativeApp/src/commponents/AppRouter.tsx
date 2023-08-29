import React, {
	useState,
	useEffect,
} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Profile } from '../screens';
import {
	User,
	onAuthStateChanged,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
	return (
		<InsideStack.Navigator>
			<InsideStack.Screen
				name="Home"
				component={Home}
			/>
			<InsideStack.Screen
				name="Profile"
				component={Profile}
			/>
		</InsideStack.Navigator>
	);
}

const AppRouter = () => {
	const [user, setUser] = useState<User | null>(
		null
	);
	const auth = FIREBASE_AUTH;

	useEffect(() => {
		console.log('user', user);

		onAuthStateChanged(auth, (user) => {
			console.log('user', user);
			setUser(user);
		});
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<Stack.Screen
						name="InsideLayout"
						component={InsideLayout}
						options={{
							headerShown: false,
						}}
					/>
				) : (
					<Stack.Screen
						name="Login"
						component={Login}
						options={{
							headerShown: false,
						}}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppRouter;
