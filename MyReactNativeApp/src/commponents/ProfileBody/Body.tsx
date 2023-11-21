import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useContext } from 'react';
import { PhotosAlbum } from '../../consts';
import Plus from '../../../assets/Svg/Plus Icon.svg';
import { useNavigation } from '@react-navigation/native';
import lengConfig from '../../comons/leng';
import PostCard from '../PostCard';

type Props = { myPosts: any };

const Body = ({ myPosts }: Props) => {
	const navigation = useNavigation();
	const about =
		'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people';

	const renderPostCard = ({
		item,
	}: {
		item: any;
	}) => (
		<View
			style={{
				borderWidth: 1,
				flex: 1,
				position: 'relative',
			}}
		>
			<PostCard
				post={item}
				isHome={true}
				isMyProfile={true}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			<View
				style={
					styles.headAboutMyContainer
				}
			>
				<Text style={styles.headline}>
					About me:
				</Text>
				<TouchableOpacity
					onPress={() => {
						console.log(
							'Edit about me section in profile'
						);
					}}
				>
					<Text>Edit</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.aboutUser}>
				{about}
			</Text>
			<PhotosAlbum

			// postImages={}
			/>
			<View>
				<TouchableOpacity
					style={
						styles.newPostsContainer
					}
					onPress={() => {
						navigation.navigate(
							lengConfig.screens
								.upload
						);
					}}
				>
					<Plus />
					<Text
						style={styles.newPostText}
					>
						New Post
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={myPosts}
				renderItem={renderPostCard}
				keyExtractor={(item, index) =>
					index.toString()
				}
			/>
		</View>
	);
};

export default Body;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 2.5,
		backgroundColor: 'white',
		borderBottomEndRadius: 8,
	},
	headAboutMyContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	headline: {
		fontSize: 24,
		paddingBottom: 5,
	},
	aboutUser: {
		paddingHorizontal: 15,
	},
	newPostsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 15,
	},
	newPostText: {
		color: '#05aff8',
		fontSize: 20,
		paddingLeft: 10,
	},
});
