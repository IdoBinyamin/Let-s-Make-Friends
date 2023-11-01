import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '../Navigation';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ChatProvider } from '../../context/ChatCtx';
import Store from '../store/store';

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and removed in a future release',
]);

const App = () => {
	return (
		<Provider store={Store}>
			<ChatProvider>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</ChatProvider>
		</Provider>
	);
};

export default App;
