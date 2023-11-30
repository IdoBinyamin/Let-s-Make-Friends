import React, { FC } from 'react';
import {
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Input } from '../../../Generic';

import Icon from '../../../../assets/Svg/unknown-user.svg';
import { styles } from '../AuthStyles';
import lengConfig from '../../../comons/leng';

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

export const LoginScreen: FC<LoginProps> = ({
	updateMode,
	setEmail,
	setPassword,
	email,
	password,
}) => {
	return (
		<KeyboardAvoidingView
			style={styles.container}
		>
			<Icon height={250} />

			<Input
				placeholder={
					lengConfig.leng.email
				}
				value={email}
				onChangeText={setEmail}
				keyboardType={
					lengConfig.keyboardType
						.emailAdrress
				}
			/>
			<Input
				placeholder={
					lengConfig.leng.password
				}
				value={password}
				onChangeText={setPassword}
				keyboardType={
					lengConfig.keyboardType
						.visiblePass
				}
				secureTextEntry={true}
			/>
			<View
				style={styles.switchPageContainer}
			>
				<Text style={styles.questionText}>
					Don't have an account?{' '}
				</Text>
				<TouchableOpacity
					onPress={updateMode}
				>
					<Text
						style={styles.onPressText}
					>
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};
