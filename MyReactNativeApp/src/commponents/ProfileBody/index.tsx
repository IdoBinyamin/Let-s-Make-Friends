import React from 'react';
import {
	FlatList,
	StyleSheet,
} from 'react-native';
import Header from './Header';
import Body from './Body';

type Props = {};

const ProfileBody = ({}: Props) => {
	return (
		<FlatList
			ListHeaderComponent={<Header />}
			ListFooterComponent={<Body />}
		/>
	);
};

export default ProfileBody;

const styles = StyleSheet.create({});
