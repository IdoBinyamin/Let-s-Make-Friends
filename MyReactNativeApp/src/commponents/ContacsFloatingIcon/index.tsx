import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ContacsFloatingIcon() {
	const navigation = useNavigation();

	const getContacts = () => {
		navigation.navigate('contacts');
	};
	return (
		<TouchableOpacity
			onPress={getContacts}
			style={{
				position: 'absolute',
				right: 20,
				bottom: 20,
				borderRadius: 60,
				width: 60,
				height: 60,
				backgroundColor: 'blue',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<MaterialCommunityIcons
				name="android-messages"
				size={30}
				color={'white'}
				style={{
					transform: [{ scaleX: -1 }],
				}}
			/>
		</TouchableOpacity>
	);
}
