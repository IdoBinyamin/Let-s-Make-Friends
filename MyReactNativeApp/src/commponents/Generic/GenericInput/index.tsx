import React from 'react';
import {
	StyleSheet,
	TextInput,
} from 'react-native';
interface inputProps {
	value: string;
	name: string;
	handleChange?: (text: string) => void;
	onBlur?: () => void;
	secureTextEntry?: boolean;
	autoCapitalize?: string;
}

export const Input = (props: inputProps) => {
	return (
		<TextInput
			value={props.value}
			placeholder={props.name}
			autoCapitalize="none"
			onChange={() => {
				props.handleChange;
			}}
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
