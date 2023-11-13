import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { HorizontalScroll } from '../../../consts';
import {
	MaterialCommunityIcons,
	Feather,
} from '@expo/vector-icons';
import { styles } from './style';

type Props = {
	images: React.Dispatch<
		React.SetStateAction<string>
	>;
	desc: string;
	setDesc: React.Dispatch<
		React.SetStateAction<string>
	>;
	title: string;
	setTitle: React.Dispatch<
		React.SetStateAction<string>
	>;
	postImagesHandler: () => void;
	createNewPost: () => void;
};

export const PostForm = ({
	images,
	desc,
	setDesc,
	title,
	setTitle,
	postImagesHandler,
	createNewPost,
}: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.headLineText}>
				Upload
			</Text>
			<View
				style={
					styles.fieldsOptionContainer
				}
			>
				<View
					style={
						styles.fieldsTextContainer
					}
				>
					<TextInput
						placeholder="Add title here"
						value={title}
						onChangeText={(text) =>
							setTitle(text)
						}
						style={
							styles.inputWrapper
						}
					/>
					<TextInput
						placeholder="Add description here"
						value={desc}
						onChangeText={(text) =>
							setDesc(text)
						}
						style={
							styles.inputWrapper
						}
					/>
				</View>

				<TouchableOpacity
					onPress={postImagesHandler}
				>
					<MaterialCommunityIcons
						name="camera-plus"
						size={50}
						color="black"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={createNewPost}
				>
					<Feather
						name="upload"
						size={50}
						color="green"
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.photoContainer}>
				{images.length !== 0 && (
					<HorizontalScroll
						postImages={images}
					/>
				)}
			</View>
		</View>
	);
};
