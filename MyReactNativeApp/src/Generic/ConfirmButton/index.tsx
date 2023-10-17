import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
interface ButtonProps {
	title: string;
	styleBtn?: Record<string, number | string>;
	styleText?: Record<string, number | string>;
	onPress: () => void;
}

export const ConfirmButton = ({
	title,
	styleBtn,
	styleText,
	onPress,
}: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.buttonStyle, styleBtn]}
		>
			<Text
				style={[
					styles.textStyle,
					styleText,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonStyle: {
		height: 48,
		width: 296,
		marginBottom: 90,
		borderColor: '#2CE4C5',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#2CE4C5',
		background:
			'transparent linear-gradient(26deg, #06DBDB 0%, #2CE4C5 100%) 0% 0% no-repeat padding-box',
		shadowColor: '#1FE1CC',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.8,
		shadowRadius: 20,
		borderRadius: 5,
		opacity: 1,
	},
	textStyle: {
		color: 'white',
		fontSize: 20,
	},
});
