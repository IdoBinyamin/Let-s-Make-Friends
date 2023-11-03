import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';

type Props = {
	route: any;
};

export const ChatScreen = (props: Props) => {
	const { room } = props.route.params;
	console.log(room);

	return (
		<View>
			<Text>hello</Text>
		</View>
	);
};

const styles = StyleSheet.create({});
