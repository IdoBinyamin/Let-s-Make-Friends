import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Button } from 'react-native';

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

export const Home = ({
	navigation,
}: RouterProps) => {
	return (
		<View>
			<Button
				title="profile"
				onPress={() => {
					navigation.navigate(
						'Profile'
					);
				}}
			/>
		</View>
	);
};
