import React from 'react';
import { View } from 'react-native';
import SearchLine from '../../commponents/SearchLine';
import PostCard from '../../commponents/PostCard';

export const SkillzScreen = ({
	navigation,
}: any) => {
	return (
		<View>
			<SearchLine
				photoURL={''}
				moveToProfile={() =>
					navigation.navigate(
						'ProfileScreen'
					)
				}
			/>
			<PostCard />
		</View>
	);
};

export default SkillzScreen;
