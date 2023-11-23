import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { PhotosAlbum } from '../../../consts';
import {
	Ionicons,
	SimpleLineIcons,
	MaterialCommunityIcons,
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
	postImagesDelete: () => void;
	createNewPost: () => void;
	restartPost: () => void;
};

export const PostForm = ({
	images,
	desc,
	setDesc,
	title,
	setTitle,
	postImagesHandler,
	postImagesDelete,
	createNewPost,
	restartPost,
}: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.headLineText}>
				Add new post
			</Text>
			<TextInput
				placeholder="Add title here"
				value={title}
				onChangeText={(text) =>
					setTitle(text)
				}
				style={styles.inputWrapper}
			/>
			<View style={styles.addOrCancelPost}>
				<TouchableOpacity
					onPress={postImagesHandler}
				>
					<MaterialCommunityIcons
						name="camera-plus-outline"
						size={50}
						color="black"
					/>
					<Text style={styles.btnText}>
						Add
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.photoContainer}>
				{images.length !== 0 ? (
					<PhotosAlbum
						isNewPost={true}
						postImages={images}
						postImagesDelete={
							postImagesDelete
						}
					/>
				) : (
					<View
						style={
							styles.beforeFirstPhoto
						}
					>
						<Text
							style={styles.btnText}
						>
							Photo/s will show here
						</Text>
						<Ionicons
							name="camera-outline"
							size={50}
							color="black"
						/>
					</View>
				)}
			</View>
			<TextInput
				placeholder="Add description here"
				value={desc}
				onChangeText={(text) =>
					setDesc(text)
				}
				style={styles.inputWrapper}
			/>
			<View style={styles.addOrCancelPost}>
				<TouchableOpacity
					onPress={createNewPost}
				>
					<SimpleLineIcons
						name="cloud-upload"
						size={50}
						color="#05AFF8"
					/>
					<Text style={styles.btnText}>
						Upload
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={restartPost}
				>
					<Ionicons
						name="md-trash-outline"
						size={50}
						color="red"
					/>
					<Text style={styles.btnText}>
						Cancel
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
