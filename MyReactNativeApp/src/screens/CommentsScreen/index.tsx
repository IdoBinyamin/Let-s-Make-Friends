import {
	Button,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React from 'react';
import { styles } from '../../commponents/PostCard/PostCardStyle';
import { NewComment } from '../../consts';

type Props = {
	route: any;
};

export const CommentsScreen = ({
	route,
}: Props) => {
	const { post } = route.params;
	// console.log('comments: ', comments);

	return (
		<View>
			{post.comments.map((com, idx) => (
				<View key={idx}>
					<Image
						source={{
							uri: com.user
								.photoURL,
						}}
						style={{
							height: 50,
							width: 50,
						}}
					/>
					<Text>{com.comment}</Text>
				</View>
			))}

			<NewComment post={post} />
		</View>
	);
};

