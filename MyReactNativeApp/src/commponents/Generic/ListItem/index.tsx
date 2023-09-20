import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
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

interface ItemProps {
	type: string;
	description?: string;
	user: {};
	time?: any;
	room?: {};
	image?: string;
	style?: ViewStyle;
	key?: string;
}

export const ListItem: React.FC<ItemProps> = ({
	type,
	description,
	user,
	time,
	room,
	image,
	style,
}) => {
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
					url={user?.photoURL}
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
								user?.contactName}
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
};

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
