import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Input } from '../../../Generic';

import Icon from '../../../../assets/Svg/unknown-user.svg';

type LoginProps = {
	updateMode: () => void;
	setEmail: React.Dispatch<
		React.SetStateAction<string>
	>;
	setPassword: React.Dispatch<
		React.SetStateAction<string>
	>;
	email: string;
	password: string;
};

export const Login = ({
	updateMode,
	setEmail,
	setPassword,
	email,
	password,
}: LoginProps) => {
	return (
		<View style={styles.container}>
			<Icon height={250} />

			<Input
				placeholder="email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
			/>
			<Input
				placeholder="password"
				value={password}
				onChangeText={setPassword}
				keyboardType="visible-password"
				secureTextEntry={true}
			/>
			<View
				style={styles.switchPageContainer}
			>
				<Text style={styles.questionText}>
					Dont have an acount?
				</Text>
				<TouchableOpacity
					onPress={updateMode}
				>
					<Text
						style={styles.onPressText}
					>
						Sign-up
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	logoContainer: {
		height: 120,
		width: 120,
		backgroundColor: 'blue',
	},
	switchPageContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	questionText: {
		color: 'gray',
		fontWeight: '600',
		fontSize: 14,
	},
	onPressText: {
		fontWeight: '600',
		fontSize: 14,
		color: '#2CE4C5',
	},
});
