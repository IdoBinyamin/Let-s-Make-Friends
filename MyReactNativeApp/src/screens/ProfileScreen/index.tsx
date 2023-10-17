import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import SearchLine from '../../commponents/SearchLine';
import PostCard from '../../commponents/PostCard';

export const ProfileScreen = () => {
	return (
		<View>
			<SearchLine photoURL={''} />
			<PostCard />
		</View>
	);
};

export default ProfileScreen;
