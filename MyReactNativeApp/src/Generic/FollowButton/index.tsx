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

export const FollowButton = ({
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
		height: 35,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 5,
		opacity: 1,
	},
	textStyle: {
		fontSize: 20,
	},
});
