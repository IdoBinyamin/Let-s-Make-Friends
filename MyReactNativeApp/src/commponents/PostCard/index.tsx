import {
	Button,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import React, { Fragment, useState } from 'react';
import Header from './Header';

import PostButtonsBar from './PostButtonsBar';
import {
	HorizontalScroll,
	MoreOrLess,
} from '../../consts';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import lengConfig from '../../comons/leng';

type Props = {};

const PostCard = (props: Props) => {
	const navigation = useNavigation();
	const currUser = useSelector(
		(state) => state.user.user
	);

	const [newComment, setNewComment] =
		useState('');

	const [isFollow, setIsFollow] =
		useState(false);
	// const [isPostLiked, setIsPostLiked] = useState(false); // futuer to be

	const isFollowerHandler = () => {
		setIsFollow(!isFollow);
	};
	// const isPostLikedHandler = () => {};

	const moveToComments = () => {
		navigation.navigate(
			lengConfig.screens.comments,
			{
				comments: post.comments,
			}
		);
	};
	// console.log(currUser.photoURL);

	const posts = [
		{
			desc: 'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people',
			user: {
				userName: 'shimon Levi',
				userSkill: 'garden',
				userPhoto: '',
			},
			createdAt: '25 min ago',
			likes: 5,
			images: [
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
			],
			comments: [
				{
					user: {
						name: 'ploni',
						photoURL:
							currUser.photoURL,
					},
					comment:
						'Comment that we see',
					createdAt: '5 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
			],
		},
		{
			desc: 'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people',
			user: {
				userName: 'shimon Levi',
				userSkill: 'garden',
				userPhoto: '',
			},
			createdAt: '25 min ago',
			likes: 5,
			images: [
				{
					uri: currUser.photoURL,
				},
			],
			comments: [
				{
					user: {
						name: 'ploni',
						photoURL:
							currUser.photoURL,
					},
					comment:
						'Comment that we see',
					createdAt: '5 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
			],
		},
	];
	return (
		<KeyboardAvoidingView
			behavior={
				Platform.OS === 'ios'
					? 'padding'
					: 'height'
			}
		>
			<ScrollView style={styles.container}>
				{posts.map((post, idx) => (
					<Fragment key={idx}>
						<Header
							isFollow={isFollow}
							isFollower={
								isFollowerHandler
							}
							userName={
								post.user.userName
							}
							userSkill={
								post.user
									.userSkill
							}
						/>

						<HorizontalScroll
							postImages={
								post.images
							}
						/>
						<PostButtonsBar
							isLiked={() => {
								console.log(
									'Liked!'
								);
							}} //TODO: make that functions
							numOfLikes={
								post.likes
							}
							addComment={
								moveToComments
							}
							shareToFeed={() => {
								console.log(
									'Shared?'
								);
							}} //TODO: make that functions
							createdAt={
								post.createdAt
							}
						/>
						<MoreOrLess
							fullText={post.desc} //TODO:
							maxLength={150}
						/>

						<View
							style={
								styles.commentsContainer
							}
						>
							{post.comments.map(
								(com, idx) => (
									<Comment
										key={idx}
										photoURL={
											com
												.user
												.photoURL
										}
										comment={
											com.comment
										}
										userName={
											com
												.user
												.name
										}
									/>
								)
							)}
							<View
								style={
									styles.newComment
								}
							>
								<TextInput
									style={{
										width: '70%',
									}}
									placeholder="Add new comment"
									value={
										newComment
									}
									onChangeText={(
										text
									) => {
										setNewComment(
											text
										);
									}}
								/>
								<Button title="Comment" />
							</View>
						</View>
					</Fragment>
				))}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PostCard;

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		backgroundColor: 'white',
		height: '100%',
		position: 'relative',
	},

	description: {
		padding: 10,
		height: 100,

		width: '100%',
	},
	commentsContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	newComment: {
		borderWidth: 1,
		borderColor: 'gray',
		alignSelf: 'center',
		width: '80%',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
});
