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
	console.log('comments: ', comments);

	return (
		<View>
			{/* {comments.map((com, idx) => (
				<View key={idx}>
					<Text>{com.text}</Text>
				</View>
			))} */}
		</View>
	);
};

const styles = StyleSheet.create({});
