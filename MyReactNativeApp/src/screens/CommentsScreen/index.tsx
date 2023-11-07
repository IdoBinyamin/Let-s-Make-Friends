import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';

type Props = {
	route: any;
};

export const CommentsScreen = ({
	route,
}: Props) => {
	const { comments } = route.params;
	return (
		<View>
			{comments.map((com, idx) => (
				<View key={idx}>
					<Text>{com.comment}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({});
