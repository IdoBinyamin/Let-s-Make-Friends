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
}

export const Input = (props: inputProps) => {
	return (
		<TextInput
			value={props.value}
			placeholder={props.placeholder}
			autoCapitalize="none"
			onChangeText={props.onChangeText}
			onBlur={props.onBlur}
			style={styles.input}
			secureTextEntry={
				props.secureTextEntry
			}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff',
	},
});
