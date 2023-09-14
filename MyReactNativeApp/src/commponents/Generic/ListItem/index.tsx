import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import {
	Grid,
	Row,
	Col,
} from 'react-native-easy-grid';
import { Avatar } from '../../../consts';

type ItemProps = {
	type?: string;
	description?: string;
	user?: {};
	time?: any;
	room?: {};
	image?: string;
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
	const navigation = useNavigation<any>();
	const moveToChat = () => {
		navigation.navigate('chat', {
			user,
			room,
			image,
		});
	};

	return (
		<TouchableOpacity
			style={[styles.container, style]}
			onPress={moveToChat}
		>
			<Col style={styles.avatarHolder}>
				<Avatar
					url={user?.item.photoURL}
					size={
						type === 'contacts'
							? 40
							: 65
					}
				/>
			</Col>
			<Col style={styles.userNameHolder}>
				<Row
					style={{
						alignItems: 'center',
					}}
				>
					<Col>
						<Text
							style={
								styles.userNameText
							}
						>
							{user?.name ||
								user?.item
									.contactName}
						</Text>
					</Col>
					{time && (
						<Col
							style={
								styles.dateHolder
							}
						>
							<Text
								style={
									styles.dateText
								}
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
						style={
							styles.descriptionHolder
						}
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

const styles = StyleSheet.create({
	container: {
		height: 80,
		flexDirection: 'row',
	},
	avatarHolder: {
		width: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
	userNameHolder: {
		marginLeft: 10,
	},
	userNameText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: 'gray', //take color
	},
	dateHolder: {
		alignItems: 'flex-end',
	},
	dateText: {
		color: 'black', //take color
	},
	descriptionHolder: {
		marginTop: -5,
	},
});
