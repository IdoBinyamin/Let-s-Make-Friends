import React from 'react';
import { ScrollView, View } from 'react-native';
import SearchLine from '../../commponents/SearchLine';
import PostCard from '../../commponents/PostCard';
import { useSelector } from 'react-redux';

export const SkillzScreen = () => {
	const currUser = useSelector(
		(state) => state?.user.user
	);
	const posts = [
		{
			desc: 'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people',
			user: {
				displayName: 'shimon Levi',
				userSkill: 'garden',
				userPhoto: '',
			},
			_id: '25 min ago',
			likes: 5,
			images: [
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
			],
			comments: [
				{
					user: {
						name: 'ploni',
						photoURL:
							currUser.photoURL,
					},
					comment:
						'Comment that we see',
					createdAt: '5 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
			],
		},
		{
			desc: 'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people',
			user: {
				displayName: 'shimon Levi',
				userSkill: 'garden',
				userPhoto: '',
			},
			_id: '5 min ago',
			likes: 5,
			images: [
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
			],
			comments: [
				{
					user: {
						name: 'ploni',
						photoURL:
							currUser.photoURL,
					},
					comment:
						'Comment that we see',
					createdAt: '5 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
			],
		},
		{
			desc: 'Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people Interior design is the art and science of enhancing the interior of a building to achieve healthier and more aesthetically pleasing environment for the people',
			user: {
				displayName: 'shimon Levi',
				userSkill: 'garden',
				userPhoto: '',
			},
			_id: '2 min ago',
			likes: 5,
			images: [
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
				{
					uri: currUser.photoURL,
				},
			],
			comments: [
				{
					user: {
						name: 'ploni',
						photoURL:
							currUser.photoURL,
					},
					comment:
						'Comment that we see',
					createdAt: '5 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
				{
					user: {
						name: 'ploni',
						photoURL: '',
					},
					comment: 'that we see',
					createdAt: '13 min ago',
				},
			],
		},
	];
	return (
		<View
			style={{
				flex: 1,
				height: '100%',
			}}
		>
			<SearchLine />
			<ScrollView>
				{posts.map((pos) => (
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
