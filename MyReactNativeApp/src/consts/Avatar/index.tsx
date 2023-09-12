import { Image } from 'react-native';
import React from 'react';

type AvatarProps = {
	size: number;
	user: any;
};

const Avatar = ({ size, user }: AvatarProps) => {
	return (
		<Image
			style={{
				width: size,
				height: size,
				borderRadius: size,
			}}
			source={
				user.item.photoURL
					? { uri: user.item.photoURL }
					: require('../../../assets/user-icon.png')
			}
			resizeMode={'stretch'}
		/>
	);
};

export default Avatar;
