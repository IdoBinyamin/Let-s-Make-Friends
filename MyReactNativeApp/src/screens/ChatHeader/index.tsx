import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from '../../consts';
import { useRoute } from '@react-navigation/native';

export const ChatHeader = ({}) => {
	const rout = useRoute();
	const user = rout.params?.user;

	return (
		<View style={{ flexDirection: 'row' }}>
			<View>
				<Avatar
					size={40}
					url={user.photoURL}
				/>
			</View>
			<View
				style={{
					marginLeft: 15,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text
					style={{
						color: 'gray', //get from colors
						fontSize: 18,
					}}
				>
					{user.contactName ||
						user.userName}
				</Text>
			</View>
		</View>
	);
};
