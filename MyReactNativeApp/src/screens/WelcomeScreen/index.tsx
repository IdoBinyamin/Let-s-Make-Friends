import { View, StyleSheet } from 'react-native';
import React from 'react';
import SkillzLogo from '../../../assets/Svg/Skillz Icon.svg';

export const Welcome = () => {
	return (
		<View style={styles.container}>
			<SkillzLogo
				width={360}
				height={640}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2CE4C5',
	},
});
