import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import { ScrollView, View } from 'react-native';
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

export const SkillzScreen = () => {
	const currUser = useSelector(
		(state) => state?.user.user
	);
	const { postsList, setPostsList } =
		useContext(PostsContext);

	useLayoutEffect(() => {
		const postsQery = query(
			collection(FIREBASE_DB, 'posts')
		);

		const unsubscribe = onSnapshot(
			postsQery,
			(querySnapShot) =>
				setPostsList(
					querySnapShot.docs.map(
						(post) => {
							if (
								post.data()
									.displayName !==
								currUser.displayName
							) {
								return post.data();
							}
						}
					)
				)
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				height: '100%',
			}}
		>
			<SearchLine />
			<ScrollView>
				{postsList.map((pos) => (
					<PostCard
						post={pos}
						key={pos._id}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default SkillzScreen;
