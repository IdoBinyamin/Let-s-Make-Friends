import React, { useContext } from 'react';
import {
	View,
	Text,
	Button,
	Image,
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';

export const Profile = () => {
	const { username } = useContext(AuthContext);
	return (
		<View>
			<Text>Hello {username} </Text>
			<Button title="Change name" />
			<Button title="Change email" />
			<Button title="Change passward" />
		</View>
	);
};
