import {
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
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
import { useNavigation } from '@react-navigation/native';
import lengConfig from '../../comons/leng';
import { RouterProps } from '../../models';

type PostProps = {
	post: {
		_id: string;
		desc: string;
		displayName: string;
		title: string;
		user: any;
		comments: any[];
		images: React.Dispatch<
			React.SetStateAction<string>
		>;
		likes: string[];
	};
};

const PostCard = ({ post }: PostProps) => {
	const navigation =
		useNavigation<RouterProps>();

	const [newComment, setNewComment] =
		useState('');

	const [isFollow, setIsFollow] =
		useState(false);

	const isFollowerHandler = () => {
		setIsFollow(!isFollow);
	};

	const moveToComments = () => {
		navigation.navigate(
			lengConfig.screens.comments,
			{
				comments: post.comments,
			}
		);
	};

	return (
		<KeyboardAvoidingView>
			<View style={styles.container}>
				<Fragment>
					<Header
						isFollow={isFollow}
						isFollower={
							isFollowerHandler
						}
						userName={
							post?.displayName
						}
						userUri={
							post?.user.photoURL
						}
					/>
					<Text
						style={
							styles.postTitleText
						}
					>
						{post.title}
					</Text>
					{post?.images.length > 0 && (
						<HorizontalScroll
							postImages={
								post?.images
							}
						/>
					)}

					<PostButtonsBar
						isLiked={() => {
							console.log('Liked!');
						}} //TODO: make that functions
						numOfLikes={
							post?.likes.length
						}
						addComment={
							moveToComments
						}
						shareToFeed={() => {
							console.log(
								'Shared?'
							);
						}} //TODO: make that functions
						createdAt={post?._id}
					/>

					{post?.desc !== '' &&
						post?.desc.length >
							20 && (
							<MoreOrLess
								fullText={
									post?.desc
								} //TODO:
								maxLength={100}
							/>
						)}

					<View
						style={
							styles.commentsContainer
						}
					>
						{post?.comments.map(
							(com, idx) => (
								<Comment
									key={idx}
									photoURL={
										com.user
											.photoURL
									}
									comment={
										com.comment
									}
									userName={
										com.user
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
								style={
									styles.newCommentText
								}
								placeholder="Add new comment"
								value={newComment}
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
			</View>
		</KeyboardAvoidingView>
	);
};

export default PostCard;

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		backgroundColor: 'white',
		paddingBottom: 25,
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
		marginTop: 15,
	},
	newComment: {
		borderWidth: 1,
		borderColor: 'gray',
		alignSelf: 'center',
		width: '80%',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	newCommentText: {
		width: '70%',
	},
	postTitleText: {
		fontSize: 15,
		alignSelf: 'flex-start',
		paddingLeft: 18,
		position: 'relative',
	},
});
