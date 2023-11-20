import React, {
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	FlatList,
	View,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import SearchLine from '../../commponents/SearchLine';
import PostCard from '../../commponents/PostCard';
import { useSelector } from 'react-redux';

import { PostsContext } from '../../../context';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	serverTimestamp,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';

export const FeedScreen = () => {
	const currUser = useSelector(
		(state) => state?.user.user
	);
	const { friendsList, setFriendsList } =
		useContext(PostsContext);

	const [isLoading, setIsLoading] =
		useState(true);

	const { postsList } =
		useContext(PostsContext);

	useEffect(() => {
		if (postsList.length > 0 && isLoading) {
			setIsLoading(false);
		}
	}, [postsList, isLoading]);

	const addFriend = async (email: string) => {
	
			try {
				await addDoc(
					collection(
						FIREBASE_DB,
						'users',
						currUser._id,
						'friendsList'
					),
					{
						user: email,
						createdAt:
							serverTimestamp(),
						isFollow: true,
					}
				);
				// Update friendsList state after adding a friend
				setFriendsList([
					...friendsList,
					email,
				]);
			} catch (error: Error) {
				console.log(
					'add friend: ',
					error.message
				);
			}
		
	};

	const removeFriend = async (
		email: string
	) => {
		const friendsListRef = collection(
			FIREBASE_DB,
			'users',
			currUser._id,
			'friendsList'
		);
		try {
			// Get all documents in the 'friendsList' subcollection
			const friendsListSnapshot =
				await getDocs(friendsListRef);

			// Find the document that matches the friend to remove
			friendsListSnapshot.forEach(
				async (friendDoc) => {
					const friendData =
						friendDoc.data();

					if (
						friendData.user === email
					) {
						// Delete the specific document from the subcollection
						await deleteDoc(
							doc(
								friendsListRef,
								friendDoc.id
							)
						);
						console.log('removed');
						// Update friendsList state after removing a friend
						setFriendsList(
							friendsList.filter(
								(friend) =>
									friend !==
									email
							)
						);
					}
				}
			);
		} catch (error: Error) {
			console.log(
				'remove friend: ',
				error.message
			);
		}
	};

	const renderPostCard = ({
		item,
	}: {
		item: any;
	}) => (
		<PostCard
			post={item}
			addFriend={addFriend}
			removeFriend={removeFriend}
		/>
	);

	return (
		<View style={styles.container}>
			<SearchLine />
			{isLoading ? (
				<>
					<ActivityIndicator
						size={'large'}
					/>
				</>
			) : (
				<>
					<FlatList
						data={postsList.filter(
							(post) =>
								post.displayName !==
								currUser.displayName
						)}
						renderItem={
							renderPostCard
						}
						keyExtractor={(
							item,
							index
						) => index.toString()}
					/>
				</>
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
