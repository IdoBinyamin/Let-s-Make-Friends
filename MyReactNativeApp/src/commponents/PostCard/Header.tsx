import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import React, { FC } from 'react';
import IconSkillz from '../../../assets/Svg/Skillz Icon black.svg';
import { FollowButton } from '../../Generic';

type HeaderProps = {
	userName: string;
	userSkill?: string;
	isFollower: () => void;
	isFollow: boolean;
};

const Header: FC<HeaderProps> = ({
	userSkill,
	userName,
	isFollower,
	isFollow,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<IconSkillz
					height={110}
					width={110}
				/>
			</View>
			<View
				style={
					styles.descriptionContainer
				}
			>
				{userSkill && (
					<Text style={styles.skilDesc}>
						{userSkill}
					</Text>
				)}
				<Text style={styles.name}>
					{userName}
				</Text>
			</View>

			<View
				style={styles.followBtnContainer}
			>
				{isFollow ? (
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
	descriptionContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		marginLeft: 120,
	},
	skilDesc: {
		fontSize: 30,
	},
	name: {
		fontSize: 18,
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
