import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
	FeedScreen,
	SkillzScreen,
	ChatRoomsScreen,
	UploadScreen,
	BoardScreen,
} from '../../screens';
import IconSkilz from '../../../assets/Svg/Skillz Icon black.svg';
import {
	Entypo,
	MaterialCommunityIcons,
	Octicons,
} from '@expo/vector-icons';
import lengConfig from '../../comons/leng';

const Tab = createBottomTabNavigator();

export const InsideLayout = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name={lengConfig.leng.chat}
				component={ChatRoomsScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Entypo
							name="chat"
							size={20}
							color={'black'}
						/>
					),
					tabBarActiveTintColor:
						'#2ce4c5',
				}}
			/>
			<Tab.Screen
				name={lengConfig.leng.skillz}
				component={SkillzScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<IconSkilz
							height={30}
							width={30}
							color={'#2ce4c5'}
						/>
					),
					tabBarActiveTintColor:
						'#2ce4c5',
				}}
			/>
			<Tab.Screen
				name={lengConfig.leng.feedScreen}
				component={FeedScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<MaterialCommunityIcons
							name="account-group"
							size={20}
							color={'black'}
						/>
					),
					tabBarActiveTintColor:
						'#2ce4c5',
				}}
			/>

			<Tab.Screen
				name={lengConfig.leng.upload}
				component={UploadScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<Octicons
							name="diff-added"
							size={20}
							color="black"
						/>
					),
					tabBarActiveTintColor:
						'#2ce4c5',
				}}
			/>
			<Tab.Screen
				name={lengConfig.leng.board}
				component={BoardScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<MaterialCommunityIcons
							name="snowboard"
							size={20}
							color="black"
						/>
					),
					tabBarActiveTintColor:
						'#2ce4c5',
				}}
			/>
		</Tab.Navigator>
	);
};
