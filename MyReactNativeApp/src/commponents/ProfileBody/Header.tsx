import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useContext } from 'react';
import { Avatar } from '../../consts';
import { useSelector } from 'react-redux';
import { PostsContext } from '../../../context';

type Props = {};

const Header = (props: Props) => {
	const user = useSelector(
		(state) => state?.user.user
	);
	const { postsList, friendsList } =
		useContext(PostsContext);
	const myPosts = postsList.filter(
		(post: { displayName: string }) =>
			post?.displayName === user.displayName
	);
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Avatar
					size={80}
					url={user.photoURL}
				/>
				<Text>{user.displayName}</Text>
			</View>
			<View style={styles.infoContainer}>
				<View
					style={
						styles.listInfoContainer
					}
				>
					<View>
						<Text>
							{myPosts.length} Posts
						</Text>
						<Text>
							{0} Profile likes
						</Text>
					</View>
					<View>
						<Text>{0} Followers</Text>
						<Text>
							{friendsList.length}{' '}
							Following
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={styles.editBtn}
				>
					<Text>Edit profile</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: 'white',
		height: 200,
		width: '100%',
		marginTop: 5,
		flexDirection: 'row',
		padding: 15,
	},
	imageContainer: {
		marginTop: 25,
		justifyContent: 'space-evenly',
		height: '65%',
		alignItems: 'center',
		width: '30%',
	},
	infoContainer: {
		height: '100%',
		width: '65%',
	},
	listInfoContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '65%',
		flexDirection: 'row',
	},
	editBtn: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 8,
		height: 25,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
