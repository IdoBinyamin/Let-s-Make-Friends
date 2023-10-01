import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
interface ButtonProps {}

export const Button = ({ children }: any) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			{children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	input: {
		borderBottomWidth: 2,
		borderBottomColor: 'blue',
		width: 200,
	},
});
