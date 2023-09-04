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
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onPress}
				style={styles.button}
			>
				<Entypo
					name={icon}
					size={38}
					color={
						color ? color : 'black'
					}
				/>
				{title ? (
					<Text style={styles.text}>
						{title}
					</Text>
				) : (
					''
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 70,
		backgroundColor: 'white',
		height: 70,
		width: 70,
		alignSelf: 'center',
		padding: 5,
	},
	button: {
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingBottom: 15,
	},
	text: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#f1f1f1',
		marginLeft: 10,
	},
});
