import React, { useContext } from 'react';
import {
	FlatList,
	StyleSheet,
} from 'react-native';
import Header from './Header';
import Body from './Body';
import { PostsContext } from '../../../context';
import { useSelector } from 'react-redux';

type Props = {};

const ProfileBody = ({}: Props) => {
	const { postsList } =
		useContext(PostsContext);
	const currUser = useSelector(
		(state) => state?.user.user
	);
	const myPosts = postsList.filter(
		(post: { displayName: string }) =>
			post?.displayName ===
			currUser.displayName
	);

	return (
		<FlatList
			ListHeaderComponent={<Header />}
			ListFooterComponent={
				<Body myPosts={myPosts} />
			}
		/>
	);
};

export default ProfileBody;

const styles = StyleSheet.create({});
