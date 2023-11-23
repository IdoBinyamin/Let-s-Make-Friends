import {
	Button,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, {
	Fragment,
	useContext,
	useRef,
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
import { styles } from './PostCardStyle';
import {
	doc,
	updateDoc,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import { useSelector } from 'react-redux';

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
	const currUser = useSelector(
		(state) => state?.user.user
	);

	const [newComment, setNewComment] =
		useState('');

	const [clickCount, setClickCount] =
		useState(0);
	const lastPress = useRef(0);

	const handleDoublePress = async () => {
		const currentTime = new Date().getTime();
		const doublePressDelay = 300;
		const isUserLiked = post.likes.filter(
			(like) =>
				like.userLiked === currUser.email
		);
		if (
			currentTime - lastPress.current <
			doublePressDelay
		) {
			// Double click action
			if (isUserLiked.length > 0) {
				try {
					await updateDoc(
						doc(
							FIREBASE_DB,
							'posts',
							post._id
						),
						{
							likes: post.likes.filter(
								(like) =>
									like.userLiked !==
									currUser.email
							),
						}
					);
				} catch (error: Error) {
					console.log(
						'User unlike: ',
						error.message
					);
				}
			} else {
				try {
					await updateDoc(
						doc(
							FIREBASE_DB,
							'posts',
							post._id
						),
						{
							likes: [
								{
									userLiked:
										currUser.email,
								},
							],
						}
					);
				} catch (error: Error) {
					console.log(
						'User like: ',
						error.message
					);
				}
			}

			console.log(
				'You like that!',
				clickCount
			);

			setClickCount(0);
		} else {
			// Single click action
			console.log('Single click!');
			setClickCount(
				(prevClickCount) =>
					prevClickCount + 1
			);
		}

		// Update the last press time
		lastPress.current = currentTime;
	};

	const isFollow =
		friendsList.filter(
			(friend) => post.user.email === friend
		).length > 0;

	const isFollowerHandler = () => {
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

	const newCommentHandler = async () => {
		console.log('comment');
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
					<TouchableOpacity
						onPress={
							handleDoublePress
						}
					>
						{post?.images.length >
							0 && (
							<PhotosAlbum
								postImages={
									post?.images
								}
							/>
						)}
					</TouchableOpacity>
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
								<Button
									title="Comment"
									onPress={
										newCommentHandler
									}
								/>
							</View>
						</View>
					)}
				</Fragment>
			</View>
		</KeyboardAvoidingView>
	);
};

export default PostCard;

