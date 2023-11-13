import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { FollowButton } from '../../Generic';
import { styles } from './headerStyle';

type HeaderProps = {
	userName: string;
	isFollower: () => void;
	isFollow: boolean;
	userUri: string;
};

const Header: FC<HeaderProps> = ({
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
