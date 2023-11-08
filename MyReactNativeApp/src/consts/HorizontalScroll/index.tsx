import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import AddSkill from '../../../assets/Svg/Plus Icon.svg';

type SkillCard = {
	uri: string;
	skill: string;
};

type Props = {
	skillCards?: SkillCard[];
	postImages?: React.Dispatch<
		React.SetStateAction<string>
	>;
	isProfile?: boolean;
};

const HorizontalScroll = ({
	skillCards = [],
	postImages,
	isProfile = false,
}: Props) => {
	return (
		<ScrollView
			horizontal
			style={styles.container}
		>
			{isProfile ? (
				<>
					<TouchableOpacity
						style={[
							styles.skillCardContainer,
							{
								position:
									'relative',
								justifyContent:
									'space-around',
							},
						]}
						onPress={() => {
							console.log(
								'Add skill'
							);
						}}
					>
						<AddSkill
							height={120}
							width={120}
						/>
						<Text
							style={
								styles.addSkillText
							}
						>
							Add skill
						</Text>
					</TouchableOpacity>
					{skillCards.map(
						(skillCard, idx) => (
							<View
								style={
									styles.skillCardContainer
								}
								key={idx}
							>
								<Image
									source={
										require('../../../assets/user-icon.png')
										// {uri:skillCard.uri}
									}
									style={{
										height: '85%',
										width: '100%',
									}}
								/>
								<Text
									style={
										styles.skillHeadeline
									}
								>
									{
										skillCard.skill
									}
								</Text>
							</View>
						)
					)}
				</>
			) : (
				<>
					{postImages?.map(
						(postImg, idx) => (
							<View
								key={idx}
								style={
									styles.imagesContainer
								}
							>
								<Image
									source={{
										uri: postImg.uri,
									}}
									style={
										styles.images
									}
									resizeMode="cover"
								/>
							</View>
						)
					)}
				</>
			)}
		</ScrollView>
	);
};

export default HorizontalScroll;

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: 'transparent',
	},
	skillCardContainer: {
		height: 300,
		width: 200,
		marginLeft: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#c7c7c7',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addSkillText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#01ccb8',
	},
	skillHeadeline: {
		fontSize: 26,
	},
	imagesContainer: {
		height: 350,
		width: 410,
		borderWidth: 1,
		borderColor: 'black',
		marginRight: 10,
	},
	images: {
		height: '100%',
		width: '100%',
		position: 'relative',
	},
});
