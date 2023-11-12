import React, {
	useContext,
	useLayoutEffect,
} from 'react';
import {
	ActivityIndicator,
	ScrollView,
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
import { useNavigation } from '@react-navigation/native';

export const SkillzScreen = () => {
	const currUser = useSelector(
		(state) => state?.user.user
	);

	const { postsList, setPostsList } =
		useContext(PostsContext);
	const navigation = useNavigation();

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
	}, [navigation]);


	return (
		<View
			style={{
				flex: 1,
				height: '100%',
			}}
		>
			<SearchLine />
			{postsList.length > 0 ? (
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
				<View>
					<ActivityIndicator
						size={'large'}
					/>
				</View>
			)}
		</View>
	);
};

export default SkillzScreen;

