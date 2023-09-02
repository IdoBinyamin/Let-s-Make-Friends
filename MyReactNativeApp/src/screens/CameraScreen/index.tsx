import React from 'react';
import { View, Text } from 'react-native';
import CameraHolder from '../../commponents/Camera';

export const Camera = () => {
	return (
		<View style={{ flex: 1 }}>
			<CameraHolder />
		</View>
	);
};
