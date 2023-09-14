import { Image } from 'react-native';
import React from 'react';

type AvatarProps = {
	size: number;
	url: string;
};

const Avatar = ({ size, url }: AvatarProps) => {
	return (
		<Image
			style={{
				width: size,
				height: size,
				borderRadius: size,
			}}
			source={
				url
					? { uri: url }
					: require('../../../assets/user-icon.png')
			}
			resizeMode={'stretch'}
		/>
	);
};

export default Avatar;
