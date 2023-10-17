import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import Header from './Header';
import Icon from '../../../assets/Svg/Skillz Icon black.svg';
import Actions from './Actions';
import MoreOrLess from '../../consts/MoreOrLessText';
import Comment from '../Comment';

type Props = {};

const PostCard = (props: Props) => {
	const desc =
		'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people';
	return (
		<ScrollView style={styles.container}>
			<Header
				userName="Ido Binyamin"
				userSkill="None"
			/>
			<ScrollView horizontal>
				<Icon height={500} width={500} />
				<Icon height={500} width={500} />
				<Icon height={500} width={500} />
			</ScrollView>

			<Actions />
			<MoreOrLess
				fullText={desc}
				maxLength={150}
			/>
			<View>
				<Comment photoURL="" />
			</View>
		</ScrollView>
	);
};

export default PostCard;

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		backgroundColor: 'white',
		height: '86%',
	},

	description: {
		padding: 10,
		height: 100,
		width: '100%',
	},
});
