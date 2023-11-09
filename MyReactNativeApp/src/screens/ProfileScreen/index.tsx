import { StyleSheet, View } from 'react-native';
import React from 'react';
import SearchLine from '../../commponents/SearchLine';
import ProfileBody from '../../commponents/ProfileBody';

type Props = {};

export const ProfileScreen = (props: Props) => {
	return (
		<View style={styles.container}>
			<SearchLine isProfilePage={true} />
			<ProfileBody />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
