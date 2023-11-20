import {
	Button,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React, {
	Fragment,
	useContext,
	useState,
} from 'react';
import Header from './Header';

import PostButtonsBar from './PostButtonsBar';
import {
	PhotosAlbum,
	MoreOrLess,
} from '../../consts';
import Comment from './Comment';
import { useNavigation } from '@react-navigation/native';
import lengConfig from '../../comons/leng';
import { RouterProps } from '../../models';
import { PostsContext } from '../../../context';

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
	isHome?: boolean;
	isMyProfile?: boolean;
	addFriend?: any;
	removeFriend?: any;
};

const PostCard = ({
	post,
	isHome = false,
	addFriend,
	removeFriend,
	isMyProfile = false,
}: PostProps) => {
	const navigation =
		useNavigation<RouterProps>();

	const { friendsList } =
		useContext(PostsContext);

	const [newComment, setNewComment] =
		useState('');

	const isFollow =
		friendsList.filter(
			(friend) => post.user.email === friend
		).length > 0;

	const isFollowerHandler = () => {
		console.log(post.user.email);
		if (isFollow) {
			removeFriend(post.user.email);
		} else {
			addFriend(post.user.email);
		}
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
					{!isMyProfile && (
						<Header
							isHome={isHome}
							isFollow={isFollow}
							isFollower={
								isFollowerHandler
							}
							userName={
								post?.displayName
							}
							userUri={
								post?.user
									.photoURL
							}
						/>
					)}
					<Text
						style={
							styles.postTitleText
						}
					>
						{post.title}
					</Text>
					{post?.images.length > 0 && (
						<PhotosAlbum
							postImages={
								post?.images
							}
						/>
					)}
					{!isMyProfile && (
						<PostButtonsBar
							isLiked={() => {
								console.log(
									'Liked!'
								);
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
					)}

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

					{!isMyProfile && (
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
									style={
										styles.newCommentText
									}
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
					)}
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
		paddingBottom: 5,
		position: 'relative',
	},
});
