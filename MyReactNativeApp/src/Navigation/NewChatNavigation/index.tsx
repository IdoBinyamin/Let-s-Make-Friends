import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import {
	Ionicons,
	FontAwesome,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouterProps } from '../../models';
import { useSelector } from 'react-redux';
import { UserInfoProps } from '../../../config/FirebaseConfig/FirebaseTypes';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
type Props = {};

export const AddNewChat = (props: Props) => {
	const [addChat, setAddChat] = useState('');
	const navigation =
		useNavigation<RouterProps>();
	const user = useSelector<UserInfoProps>(
		(state) => state?.user.user
	);
	const createNewChat = async () => {
		let id = `${Date.now()}`;

		const _doc = {
			_id: id,
			user: user,
			chatName: addChat,
		};
		if (addChat !== '') {
			setDoc(
				doc(FIREBASE_DB, 'chats', id),
				_doc
			)
				.then(() => {
					setAddChat('');
					navigation.navigate('Chat');
				})
				.catch((error: Error) => {
					alert(
						'Error: ',
						error.message
					);
				});
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.addChatLine}>
				<Ionicons
					name="chatbubbles"
					size={30}
				/>
				<TextInput
					style={{
						flex: 1,
						marginTop: 5,
						width: '100%',
						fontSize: 18,
					}}
					placeholder="Create a chat"
					placeholderTextColor={'#999'}
					value={addChat}
					onChangeText={(text) =>
						setAddChat(text)
					}
				/>
				<TouchableOpacity
					onPress={createNewChat}
				>
					<FontAwesome
						name="send"
						size={30}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	addChatLine: {
		height: 50,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
	},
});
