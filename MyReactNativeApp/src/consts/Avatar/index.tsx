import { Image } from 'react-native';
import React from 'react';

type AvatarProps = {
	size: number;
	user: any;
};

const Avatar = ({ size, user }: AvatarProps) => {
	// console.log(user);

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
			resizeMode={'cover'}
		/>
	);
};

export default Avatar;
