import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { HorizontalScroll } from '../../consts';
import Plus from '../../../assets/Svg/Plus Icon.svg';

type Props = {};

const Body = (props: Props) => {
	const about =
		'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people';

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
			<Text>{about}</Text>
			<HorizontalScroll
				isProfile={true}
				// postImages={}
			/>
			<View>
				<TouchableOpacity
					style={
						styles.newPostsContainer
					}
					onPress={() => {
						console.log(
							'Post new job request'
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
		padding: 20,
	},
	headAboutMyContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headline: {
		fontSize: 24,
		paddingBottom: 5,
	},
	newPostsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
	},
	newPostText: {
		color: '#05aff8',
		fontSize: 20,
		paddingLeft: 10,
	},
});
