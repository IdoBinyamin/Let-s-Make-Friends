import React, {
	useState,
	useEffect,
} from 'react';
import {
	User,
	onAuthStateChanged,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '../Navigation';
import { AuthProvider } from '../../context/AuthContext';
import { LogBox, Text } from 'react-native';

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and removed in a future release',
]);

const App = () => {
	const [user, setUser] = useState<User | null>(
		null
	);

	useEffect(() => {
		onAuthStateChanged(
			FIREBASE_AUTH,
			(user) => {
				console.log('user', user);
				setUser(user);
			}
		);
	}, []);

	return (
		// <AuthProvider>
		<NavigationContainer>
			<MainNavigator user={user} />
		</NavigationContainer>
		// </AuthProvider>
	);
};


export default App;
