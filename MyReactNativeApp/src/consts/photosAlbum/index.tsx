import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';

type Props = {
	postImages?: React.Dispatch<
		React.SetStateAction<[{ uri: string }]>
	>;
};

const PhotosAlbum = ({ postImages }: Props) => {
	const [clickCount, setClickCount] =
		useState(0);
	const lastPress = useRef(0);

	const handlePress = () => {
		const currentTime = new Date().getTime();
		const doublePressDelay = 300; // Adjust this value based on your desired double-click delay

		if (
			currentTime - lastPress.current <
			doublePressDelay
		) {
			// Double click action
			//TODO: add here logic to like post
			console.log(
				'You like that!',
				clickCount
			);

			setClickCount(0);
		} else {
			// Single click action
			console.log('Single click!');
			setClickCount(
				(prevClickCount) =>
					prevClickCount + 1
			);
		}

		// Update the last press time
		lastPress.current = currentTime;
	};

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
	const renderItem = ({ item }: any) => (
		<TouchableOpacity onPress={handlePress}>
			<Image
				source={{ uri: item.uri }}
				style={{
					...styles.image,
					...calculateImageSize(),
				}}
			/>
		</TouchableOpacity>
	);

	return (
		<FlatList
			data={postImages}
			numColumns={2}
			renderItem={renderItem}
			keyExtractor={(item) => item.uri}
			contentContainerStyle={
				styles.container
			}
		/>
	);
};

export default PhotosAlbum;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
	},
	image: {
		marginBottom: 5,
		marginLeft: '1.5%',
	},
});
