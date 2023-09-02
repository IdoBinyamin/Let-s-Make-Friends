import React from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface ButtonProps {
	title?: string;
	onPress?: () => void;
	icon?: string;
	color?: string;
}

export const CameraButton = ({
	title,
	onPress,
	icon,
	color,
}: ButtonProps) => {
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<Entypo
					name={icon}
					size={20}
					color={
						color ? color : '#f1f1f1'
					}
				/>
				<Text style={styles.text}>
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 15,
	},
	text: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#f1f1f1',
		marginLeft: 10,
	},
});
