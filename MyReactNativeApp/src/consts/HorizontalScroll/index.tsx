import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

type Props = {
	postImages?: React.Dispatch<
		React.SetStateAction<[{ uri: string }]>
	>;
	isProfile?: boolean;
};

const HorizontalScroll = ({
	postImages,
	isProfile = false,
}: Props) => {
	const calculateImageSize = () => {
		const screenWidth =
			Dimensions.get('window').width;
		const numColumns = Math.min(
			postImages.length,
			3
		); // Maximum of 3 columns
		const imageSize =
			screenWidth / numColumns - 10; // Calculate the size based on the number of columns
		return {
			width: imageSize,
			height: imageSize,
		};
	};
	const renderItem = ({ item }: any) => (
		<TouchableOpacity>
			<Image
				source={{ uri: item.uri }}
				style={{
					...styles.image,
					...calculateImageSize(),
				}}
			/>
		</TouchableOpacity>
	);
	const renderPosts = ({ item }: any) => (
		<TouchableOpacity>
			<Image
				source={{ uri: item[0].uri }}
			/>
		</TouchableOpacity>
	);

	if (isProfile) {
		<FlatList
			data={postImages}
			numColumns={3}
			renderItem={renderPosts}
			keyExtractor={(item) => item.uri}
			contentContainerStyle={
				styles.container
			}
		/>;
	}
	return (
		<FlatList
			data={postImages}
			numColumns={3}
			renderItem={renderItem}
			keyExtractor={(item) => item.uri}
			contentContainerStyle={
				styles.container
			}
		/>
	);
};

export default HorizontalScroll;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
	},
	image: {
		marginRight: 5,
		marginBottom: 5,
	},
});
