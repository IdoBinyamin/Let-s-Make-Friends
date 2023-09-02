import React, { useState } from 'react';
import { Login } from '../../commponents/authentication/Login';
import { Register } from '../../commponents/authentication/Register';
import { Text, Pressable } from 'react-native';
export const Authetication = () => {
	const [isNewUser, setIsNewUser] =
		useState(false);
	const loginAndUpHandler = () => {
		setIsNewUser(!isNewUser);
	};
	return (
		<>
			{isNewUser ? <Register /> : <Login />}
			<Pressable
				onPress={loginAndUpHandler}
				style={{
					flex: 0.2,
					alignItems: 'center',
				}}
			>
				<Text>
					{isNewUser
						? 'Return user'
						: 'New user'}
				</Text>
			</Pressable>
		</>
	);
};
