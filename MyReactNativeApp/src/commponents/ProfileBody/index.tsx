import {
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import React from 'react';
import Header from './Header';
import Body from './Body';

type Props = {};

const ProfileBody = (props: Props) => {
	return (
		<ScrollView>
			<Header />
			<Body />
			<View
				style={{
					height: 500,
					marginTop: 5,
					backgroundColor: 'white',
				}}
			></View>
		</ScrollView>
	);
};

export default ProfileBody;

const styles = StyleSheet.create({});
