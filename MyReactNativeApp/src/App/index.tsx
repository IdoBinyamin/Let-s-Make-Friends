import React, {
	useState,
	useEffect,
} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '../Navigation';
import { LogBox } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import {
	User,
	onAuthStateChanged,
} from 'firebase/auth';

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
				// console.log('user', user);
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
