import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React from 'react';
import { HorizontalScroll } from '../../../consts';

type Props = {
	images: React.Dispatch<
		React.SetStateAction<string>
	>;
	desc: string;
	setDesc: React.Dispatch<
		React.SetStateAction<string>
	>;
	postImagesHandler: () => void;
	createNewPost: () => void;
};

export const PostForm = ({
	images,
	desc,
	setDesc,
	postImagesHandler,
	createNewPost,
}: Props) => {
	return (
		<View style={styles.container}>
			<Text>Upload</Text>
			<TextInput
				placeholder="Add description here"
				value={desc}
				onChangeText={(text) =>
					setDesc(text)
				}
			/>

			<Button
				title={
					images.length === 0
						? 'Add images'
						: 'Add another image'
				}
				onPress={postImagesHandler}
			/>
			{images.length !== 0 && (
				<HorizontalScroll
					postImages={images}
				/>
			)}
			<Button
				title="Testing"
				onPress={createNewPost}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
