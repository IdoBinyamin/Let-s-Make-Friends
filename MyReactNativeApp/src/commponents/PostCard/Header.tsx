import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import React, { FC, useState } from 'react';
import IconSkillz from '../../../assets/Svg/Skillz Icon black.svg';
import { FollowButton } from '../../Generic';

type HeaderProps = {
	userName: string;
	userSkill: string;
};

const Header: FC<HeaderProps> = ({
	userSkill,
	userName,
}) => {
	const [isFollow, setIsFollow] =
		useState(false);
	return (
		<View style={styles.container}>
			<IconSkillz />
			<View
				style={
					styles.descriptionContainer
				}
			>
				<Text style={styles.skilDesc}>
					{userSkill}
				</Text>
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
						onPress={() => {
							console.log('Follow');
							setIsFollow(
								!isFollow
							);
						}}
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
						onPress={() => {
							console.log(
								'Unfollow'
							);
							setIsFollow(
								!isFollow
							);
						}}
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
	},
	descriptionContainer: {
		justifyContent: 'center',
		alignContent: 'center',
	},
	skilDesc: {
		fontSize: 30,
	},
	name: {},
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
