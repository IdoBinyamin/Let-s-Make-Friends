import { Image } from 'react-native';
import React, { FC } from 'react';

type AvatarProps = {
	size: number;
	url: string;
	style?: Record<string, number | string>;
};

const Avatar: FC<AvatarProps> = ({
	size,
	url,
	style,
}) => {
	return (
		<Image
			style={[
				{
					width: size,
					height: size,
					borderRadius: size,
				},
				style,
			]}
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
