import {
	KeyboardAvoidingView,
	Text,
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
	NewComment,
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

	const commentsToShow = post?.comments.slice(
		post?.comments.length - 3,
		post?.comments.length
	);
	const [clickCount, setClickCount] =
		useState(0);
	const lastPress = useRef(0);

	const handleDoublePress = async () => {
		const currentTime = new Date().getTime();
		const doublePressDelay = 300;
		const likesList = [
			...post.likes,
			{
				userLiked: currUser.email,
			},
		];
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
							likes: likesList,
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
				post: post,
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

					<PostButtonsBar
						isLiked={() => {
							console.log('Liked!');
						}} //TODO: make that functions
						numOfLikes={
							post?.likes.length
						}
						numOfComments={
							post?.comments.length
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

					{!isMyProfile && (
						<View
							style={
								styles.commentsContainer
							}
						>
							{commentsToShow.map(
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
							<NewComment
								post={post}
							/>
						</View>
					)}
				</Fragment>
			</View>
		</KeyboardAvoidingView>
	);
};

export default PostCard;
