import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import SearchLine from '../../../commponents/SearchLine';
import AddChat from '../../../../assets/Svg/add chat.svg';
import { useNavigation } from '@react-navigation/native';
import { RouterProps } from '../../../models';
import { AllChats } from '../AllChats';
import lengConfig from '../../../comons/leng';

export const ChatRoomsScreen = () => {
	const navigation =
		useNavigation<RouterProps>();
	return (
		<View style={styles.container}>
			<SearchLine isChatScreen={true} />
			<AllChats />
			<View
				style={
					styles.messagesBtnContainer
				}
			>
				<TouchableOpacity
					style={styles.messagesBtn}
					onPress={() =>
						navigation.navigate(
							lengConfig.screens
								.addNewChat
						)
					}
				>
					<AddChat />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	messagesBtnContainer: {
		height: 80,
		width: 80,
		position: 'relative',
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		borderRadius: 90,
		alignContent: 'center',
		alignItems: 'center',
	},
	messagesBtn: {
		justifyContent: 'center',
		paddingTop: 50,
		paddingLeft: 5,
	},
});
