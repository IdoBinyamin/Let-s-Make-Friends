import React, {
	useContext,
	useLayoutEffect,
} from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';
import SearchLine from '../../commponents/SearchLine';
import { PostsContext } from '../../../context';
import PostCard from '../../commponents/PostCard';
import {
	collection,
	onSnapshot,
	query,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import { useSelector } from 'react-redux';

export const HomeScreen = () => {
	const { postsList, setPostsList } =
		useContext(PostsContext);

	const currUser = useSelector(
		(state) => state?.user.user
	);

	const { friendsList, setFriendsList } =
		useContext(PostsContext);

	useLayoutEffect(() => {
		// Fetch friendsList before showing the page
		const friendsQuery = query(
			collection(
				FIREBASE_DB,
				'users',
				currUser._id,
				'friendsList'
			)
		);

		const friendsUnsubscribe = onSnapshot(
			friendsQuery,
			(snapshot) => {
				setFriendsList(
					snapshot.docs.map(
						(doc) => doc.data().user
					)
				);
			}
		);

		return () => {
			friendsUnsubscribe();
		};
	}, [currUser._id]);

	useLayoutEffect(() => {
		try {
			const postsQuery = query(
				collection(FIREBASE_DB, 'posts')
			);

			const postsUnsubscribe = onSnapshot(
				postsQuery,
				(querySnapShot) =>
					setPostsList(
						querySnapShot.docs.map(
							(post) => {
								return post.data();
							}
						)
					)
			);

			return () => {
				postsUnsubscribe();
			};
		} catch (error: any) {
			console.log('Error: ', error.message);
		}
	}, [setPostsList]);

	// Filter posts to show only those from friends
	const homePosts = postsList.filter(
		(post: any) =>
			friendsList.includes(post.user.email)
	);

	const renderPostCard = ({
		item,
	}: {
		item: any;
	}) => <PostCard post={item} isHome={true} />;

	return (
		<View style={styles.container}>
			<SearchLine />
			{homePosts.length > 0 ? (
				<FlatList
					data={homePosts}
					renderItem={renderPostCard}
					keyExtractor={(item, index) =>
						index.toString()
					}
				/>
			) : (
				<View style={styles.loadingPosts}>
					<Text>No posts to show</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	loadingPosts: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
