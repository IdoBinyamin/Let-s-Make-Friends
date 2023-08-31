import React, { useState } from 'react';
import {
	Login,
	Registration,
} from '../../commponents/authentication';
import { Button, View } from 'react-native';

export const Authetication = () => {
	const [isNewUser, setIsNewUser] =
		useState<boolean>(false);
	return (
		<View
			style={{ flex: 1, paddingBottom: 50 }}
		>
			{isNewUser ? (
				<Registration />
			) : (
				<Login />
			)}
			<Button
				title={
					!isNewUser
						? 'For new user press here'
						: 'Rgistered user'
				}
				onPress={() => {
					setIsNewUser(!isNewUser);
				}}
			/>
		</View>
	);
};
