import React, { FC } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Input } from '../../../Generic';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../AuthStyles';
import lengConfig from '../../../comons/leng';


type SignUpProps = {
	updateMode: () => void;
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

export const SignUpScreen: FC<SignUpProps> = ({
	updateMode,
	setEmail,
	setPassword,
	setName,
	profilePictureHandler,
	name,
	email,
	password,
	photoURL,
}) => {
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
							style={
								styles.blanckImage
							}
						/>
					)}
				</TouchableOpacity>
				<Text>Add a profile pic</Text>
			</View>

			<View>
				<Input
					placeholder={
						lengConfig.leng.enterName
					}
					value={name}
					onChangeText={setName}
					keyboardType={
						lengConfig.keyboardType
							.default
					}
				/>
				<Input
					placeholder={
						lengConfig.leng.enterEmail
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
					style={
						styles.switchPageContainer
					}
				>
					<Text
						style={
							styles.questionText
						}
					>
						Already have an account?{' '}
					</Text>
					<TouchableOpacity
						onPress={updateMode}
					>
						<Text
							style={
								styles.onPressText
							}
						>
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
