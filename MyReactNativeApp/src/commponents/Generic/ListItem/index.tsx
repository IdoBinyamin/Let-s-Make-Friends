import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import {
	Grid,
	Row,
	Col,
} from 'react-native-easy-grid';
import { Avatar } from '../../../consts';

type ItemProps = {
	type?: any;
	description?: any;
	user?: any;
	time?: any;
	room?: any;
	image?: any;
	style?: any;
};

export function ListItem({
	type,
	description,
	user,
	time,
	room,
	image,
	style,
}: ItemProps) {
	const navigation = useNavigation();
	const moveToChat = () => {
		navigation.navigate('chat', {
			user,
			room,
			image,
		});
	};

	return (
		<TouchableOpacity
			style={{
				height: 80,
				...style,
				flexDirection: 'row',
			}}
			onPress={moveToChat}
		>
			<Col
				style={{
					width: 80,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Avatar
					user={user}
					size={
						type === 'contacts'
							? 40
							: 65
					}
				/>
			</Col>
			<Col style={{ marginLeft: 10 }}>
				<Row
					style={{
						alignItems: 'center',
					}}
				>
					<Col>
						<Text
							style={{
								fontWeight:
									'bold',
								fontSize: 16,
								color: 'gray', //take color
							}}
						>
							{user.item
								.contactName ||
								user.name}
						</Text>
					</Col>
					{time && (
						<Col
							style={{
								alignItems:
									'flex-end',
							}}
						>
							<Text
								style={{
									color: 'black', //take color
								}}
							>
								{new Date(
									time.second *
										1000
								).toLocaleString()}
							</Text>
						</Col>
					)}
				</Row>
				{description && (
					<Row
						style={{ marginTop: -5 }}
					>
						<Text
							style={{
								color: 'black', //take color
								fontSize: 13,
							}}
						>
							{description}
						</Text>
					</Row>
				)}
			</Col>
			<Grid
				style={{ maxHeight: 80 }}
			></Grid>
		</TouchableOpacity>
	);
}
