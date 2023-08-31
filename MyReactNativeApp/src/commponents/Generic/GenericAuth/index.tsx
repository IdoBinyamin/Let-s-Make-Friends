import React from 'react';
import { Input } from '../GenericInput';

interface InputsProps {
	email: string;
	password: string;
	setEmail: (text: string) => string | void;
	setPassword: (text: string) => string | void;
}

export const AuthInputs = (
	props: InputsProps
) => {
	const inputs = [
		{
			value: props.email,
			name: 'Email',
			autoCapitalize: 'none',
			onChangeText: (text: string) =>
				props.setEmail(text),
		},
		{
			secureTextEntry: true,
			value: props.password,
			name: 'Password',
			autoCapitalize: 'none',
			onChangeText: (text: string) =>
				props.setPassword(text),
		},
	];

	return (
		<>
			{inputs.map((input) => {
				return (
					<Input
						key={input.name}
						secureTextEntry={
							input.secureTextEntry
						}
						value={input.value}
						name={input.name}
						autoCapitalize={
							input.autoCapitalize
						}
						handleChange={
							input.onChangeText
						}
					/>
				);
			})}
		</>
	);
};
