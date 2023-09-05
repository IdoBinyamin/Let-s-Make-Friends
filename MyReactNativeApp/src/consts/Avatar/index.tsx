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
				user.profilePicture
					? { uri: user.profilePicture }
					: require('../../../assets/user-icon.png')
			}
			resizeMode={'cover'}
		/>
	);
};

export default Avatar;
