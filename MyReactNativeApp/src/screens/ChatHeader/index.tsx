import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from '../../consts';
import { useRoute } from '@react-navigation/native';

export const ChatHeader = ({}) => {
	const rout = useRoute();
	return (
		<View style={{ flexDirection: 'row' }}>
			<View>
				<Avatar
					size={40}
					user={rout.params?.user}
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
					{rout.params?.user.item
						.contactName ||
						rout.params?.user.item
							.displayName}
				</Text>
			</View>
		</View>
	);
};
