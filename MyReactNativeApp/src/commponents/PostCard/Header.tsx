import {
	StyleSheet,
	View,
	Text,
	Image,
} from 'react-native';
import React, { FC } from 'react';
import { FollowButton } from '../../Generic';

type HeaderProps = {
	userName: string;
	postTitle?: string;
	isFollower: () => void;
	isFollow: boolean;
	userUri: string;
};

const Header: FC<HeaderProps> = ({
	postTitle,
	userName,
	isFollower,
	isFollow,
	userUri,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Image
					source={{ uri: userUri }}
					style={styles.ownerImage}
				/>
			</View>
			<View
				style={
					styles.descriptionContainer
				}
			>
				<Text style={styles.name}>
					{userName}
				</Text>
				{postTitle && (
					<Text
						style={
							styles.postTitleText
						}
					>
						{postTitle}
					</Text>
				)}
			</View>

			<View
				style={styles.followBtnContainer}
			>
				{!isFollow ? (
					<FollowButton
						title="+ Follow"
						onPress={isFollower}
						styleBtn={
							styles.followBtn
						}
						styleText={
							styles.followText
						}
					/>
				) : (
					<FollowButton
						title="Unfollow"
						onPress={isFollower}
						styleBtn={
							styles.unfollowBtn
						}
						styleText={
							styles.unfollowText
						}
					/>
				)}
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 100,
	},
	iconContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 20,
		top: 15,
		right: 0,
		height: 100,
		width: 100,
		borderWidth: 1,
		borderRadius: 90,
	},
	ownerImage: {
		height: 90,
		width: 90,
		borderRadius: 110,
	},
	descriptionContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		marginLeft: 120,
	},
	postTitleText: {
		fontSize: 18,
	},
	name: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	followBtnContainer: {
		width: 105,
		justifyContent: 'center',
	},
	followBtn: {
		width: 90,
		backgroundColor: '#007FFF',
		borderColor: '#007FFF',
	},
	followText: {
		color: 'white',
	},
	unfollowBtn: {
		width: 100,
		backgroundColor: 'white',
		borderColor: '#007FFF',
	},
	unfollowText: {
		color: '#007FFF',
	},
});
