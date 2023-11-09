import {
	Text,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/Ionicons';

type Props = {
	onPress: () => void;
	text?: string;
	image?: any;
	textStyle: any;
};

export const TopButton = ({
	onPress,
	textStyle,
	text,
	image = (
		<AntDesign
			name={'home'}
			size={24}
			color={'red'}
			style={{
				marginLeft: 10,
			}}
		/>
	),
}: Props) => {
	return (
		<TouchableOpacity
			style={{
				marginRight: 10,
				flexDirection: 'row',
			}}
			onPress={onPress}
		>
			{image}
			<Text style={textStyle}>{text}</Text>
		</TouchableOpacity>
	);
};
