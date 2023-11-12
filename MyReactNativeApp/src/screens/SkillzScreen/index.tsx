import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import {
	ActivityIndicator,
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

export const SkillzScreen = () => {
	const currUser = useSelector(
		(state) => state?.user.user
	);

	const [isLoading, setIsLoading] =
		useState(false);

	const { postsList, setPostsList } =
		useContext(PostsContext);

	useLayoutEffect(() => {
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

export default SkillzScreen;

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
