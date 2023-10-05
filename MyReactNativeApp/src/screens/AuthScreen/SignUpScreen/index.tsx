import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Input } from '../../../Generic';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../AuthStyles';

type SignUpProps = {
	updateMode: (mode: string) => void;
	setEmail: React.Dispatch<
		React.SetStateAction<string>
	>;
	setPassword: React.Dispatch<
		React.SetStateAction<string>
	>;
	setName: React.Dispatch<
		React.SetStateAction<string>
	>;
	profilePictureHandler: () => void;
	name: string;
	email: string;
	password: string;
	photoURL: string;
};

export const SignUp = ({
	updateMode,
	setEmail,
	setPassword,
	setName,
	profilePictureHandler,
	name,
	email,
	password,
	photoURL,
}: SignUpProps) => {
	return (
		<View style={styles.container}>
			<View>
				<TouchableOpacity
					onPress={
						profilePictureHandler
					}
					style={
						styles.choosePhotoContainer
					}
				>
					{!photoURL ? (
						<FontAwesome
							size={120}
							color={'white'}
							name="plus"
						/>
					) : (
						<Image
							source={{
								uri: photoURL,
							}}
							style={{
								height: '100%',
								width: '100%',
								borderRadius: 120,
							}}
						/>
					)}
				</TouchableOpacity>
				<Text>Add a profile pic</Text>
			</View>

			<View>
				<Input
					placeholder="Type your name"
					value={name}
					onChangeText={setName}
					keyboardType="default"
				/>
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
					style={
						styles.switchPageContainer
					}
				>
					<Text
						style={
							styles.questionText
						}
					>
						Already have an acount?
					</Text>
					<TouchableOpacity
						onPress={updateMode}
					>
						<Text
							style={
								styles.onPressText
							}
						>
							Signin
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignContent: 'center',
// 		alignItems: 'center',
// 	},
// });
