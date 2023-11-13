import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import SearchLine from '../../commponents/SearchLine';
import PostCard from '../../commponents/PostCard';
import { useSelector } from 'react-redux';
import {
	collection,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import { PostsContext } from '../../../context';
import { StyleSheet } from 'react-native';

export const FeedScreen = () => {
	const currUser = useSelector(
		(state) => state?.user.user
	);

	const [isLoading, setIsLoading] =
		useState(false);

	const { postsList, setPostsList } =
		useContext(PostsContext);

	useLayoutEffect(() => {
		setIsLoading(true);
		try {
			const postsQery = query(
				collection(FIREBASE_DB, 'posts'),
				where(
					'displayName',
					'!=',
					currUser.displayName
				)
			);

			const unsubscribe = onSnapshot(
				postsQery,
				(querySnapShot) =>
					setPostsList(
						querySnapShot.docs.map(
							(post) => {
								return post.data();
							}
						)
					)
			);
			setIsLoading(false);
			return () => {
				unsubscribe();
			};
		} catch (error: any) {
			console.log('Error: ', error.message);
		}
	}, [postsList]);

	return (
		<View style={styles.container}>
			<SearchLine />
			{postsList.length !== 0 ? (
				<ScrollView>
					{postsList.map((pos, idx) => {
						return (
							<PostCard
								post={pos}
								key={idx}
							/>
						);
					})}
				</ScrollView>
			) : (
				<View style={styles.loadingPosts}>
					<Text>No posts to show</Text>
				</View>
			)}
		</View>
	);
};

export default FeedScreen;

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
