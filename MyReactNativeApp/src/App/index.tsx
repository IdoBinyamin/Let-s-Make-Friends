import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '../Navigation';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ChatProvider } from '../../context/ChatCtx';
import Store from '../store/store';
import { PostsProvider } from '../../context/PostsCtx';

LogBox.ignoreLogs([
	'Setting a timer',
	'AsyncStorage has been extracted from react-native core and removed in a future release',
]);

const App = () => {
	return (
		<Provider store={Store}>
			<PostsProvider>
				<ChatProvider>
					<NavigationContainer>
						<MainNavigator />
					</NavigationContainer>
				</ChatProvider>
			</PostsProvider>
		</Provider>
	);
};

export default App;
