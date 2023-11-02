import {
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { MessageCard } from '../../consts';

type Props = {};

export const AllChats = (props: Props) => {
	const [isLoading, setIsLoading] =
		useState(false);
	return (
		<ScrollView style={styles.container}>
			{isLoading ? (
				<View
					style={
						styles.loadingContainer
					}
				>
					<ActivityIndicator
						size={'large'}
						color={'#2CE4C5'}
					/>
				</View>
			) : (
				<>
					<MessageCard />
					<MessageCard />
					<MessageCard />
					<MessageCard />
					<MessageCard />
					<MessageCard />
				</>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	loadingContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
