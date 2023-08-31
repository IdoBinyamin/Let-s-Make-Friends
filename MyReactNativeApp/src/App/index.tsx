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

const App = () => {
	const [user, setUser] = useState<User | null>(
		null
	);
	const auth = FIREBASE_AUTH;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log('user', user);
			setUser(user);
		});
	}, []);

	return (
		<NavigationContainer>
			<MainNavigator user={user} />
		</NavigationContainer>
	);
};

export default App;
