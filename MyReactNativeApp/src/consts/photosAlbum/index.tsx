import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { Fragment } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
	postImages?: React.Dispatch<
		React.SetStateAction<[{ uri: string }]>
	>;
	postImagesDelete?: (uri: string) => void;
	isNewPost?: boolean;
};

const PhotosAlbum = ({
	postImages,
	isNewPost = false,
	postImagesDelete,
}: Props) => {
	const calculateImageSize = () => {
		const screenWidth =
			Dimensions.get('window').width;
		const numColumns = Math.min(
			postImages.length,
			2
		); // Maximum of 3 columns
		const imageSize =
			screenWidth / numColumns - 10; // Calculate the size based on the number of columns
		return {
			width: imageSize,
			height: imageSize,
		};
	};
	return (
		<ScrollView horizontal>
			{postImages?.length > 0 &&
				postImages?.map((item, idx) =>
					isNewPost ? (
						<Fragment key={idx}>
							<TouchableOpacity
								style={
									styles.deleteImageBtn
								}
								onPress={() => {
									postImages?.length >
										0 &&
										postImagesDelete(
											item.uri
										);
								}}
							>
								<Ionicons
									name="md-trash-outline"
									size={30}
									color="red"
								/>
							</TouchableOpacity>
							<Image
								source={{
									uri: item.uri,
								}}
								style={{
									...styles.image,
									...calculateImageSize(),
								}}
							/>
						</Fragment>
					) : (
						<View key={idx}>
							<Image
								source={{
									uri: item.uri,
								}}
								style={{
									...styles.image,
									...calculateImageSize(),
								}}
							/>
						</View>
					)
				)}
		</ScrollView>
	);
};
export default PhotosAlbum;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: 15,
		justifyContent: 'space-around',
	},
	image: {
		flex: 1,
		resizeMode: 'cover', // Adjust as needed
		marginBottom: 5,
		marginHorizontal: 3,
		zIndex: 1,
	},
	deleteImageBtn: {
		position: 'absolute',
		justifyContent: 'center',
		alignContent: 'center',
		zIndex: 2,
	},
});
