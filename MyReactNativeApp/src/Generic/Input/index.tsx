import React from 'react';
import {
	StyleSheet,
	TextInput,
} from 'react-native';
interface inputProps {
	value: string;
	placeholder?: string;
	onChangeText?: (text: string) => void;
	onBlur?: () => void;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
	keyboardType?: string;
	style?: any;
}

export const Input = (props: inputProps) => {
	return (
		<TextInput
			value={props.value}
			placeholder={props.placeholder}
			autoCapitalize="none"
			onChangeText={props.onChangeText}
			onBlur={props.onBlur}
			style={[styles.input, props.style]}
			secureTextEntry={
				props.secureTextEntry
			}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: '#C7C7C7',
		height: 48,
		width: 296,
		borderRadius: 5,
		marginTop: 10,
		padding: 10,
	},
});
