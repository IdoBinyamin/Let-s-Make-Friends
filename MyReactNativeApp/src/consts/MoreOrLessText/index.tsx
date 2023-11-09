import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

type Props = {
	fullText: string;
	maxLength: number;
};

const MoreOrLess = ({
	fullText,
	maxLength,
}: Props) => {
	const [isExpanded, setExpanded] =
		useState(false);

	const toggleExpanded = () => {
		setExpanded(!isExpanded);
	};

	const shouldShowMore =
		fullText?.length > maxLength;

	// Get the part of the string to display
	const displayedText = shouldShowMore
		? fullText.substring(0, maxLength) + '...'
		: fullText;

	return (
		<View style={styles.container}>
			<Text>
				{isExpanded
					? fullText
					: displayedText}
			</Text>
			<TouchableOpacity
				style={{
					justifyContent: 'flex-end',
				}}
				onPress={toggleExpanded}
			>
				<Text style={styles.showMore}>
					{isExpanded
						? ' Less'
						: ' More...'}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		width: '95%',
	},
	showMore: {
		color: 'blue',
		marginTop: 5,
		alignSelf: 'baseline',
	},
});

export default MoreOrLess;
