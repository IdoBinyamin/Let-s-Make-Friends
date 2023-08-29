import React from 'react';
import { Text, View, Button } from 'react-native';

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

export const Home = ({
	navigation,
}: RouterProps) => {
	return (
		<View>
			{/* <Text>Hello user</Text>; */}
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
