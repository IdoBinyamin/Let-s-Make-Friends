import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import {
	AntDesign,
	Feather,
	Fontisto,
	FontAwesome,
} from '@expo/vector-icons';
import { formatDate } from '../../../util';

type Props = {
	isLiked: () => void;
	numOfLikes: number;
	addComment: () => void;
	shareToFeed: () => void;
	createdAt: string;
};

const PostButtonsBar = (props: Props) => {
	return (
		<View style={styles.actionsLineContainer}>
			<View style={styles.actionsContainer}>
				<TouchableOpacity
					onPress={props.isLiked}
				>
					<AntDesign
						name="hearto"
						size={35}
					/>
				</TouchableOpacity>
				<Text>{props.numOfLikes}</Text>
				<TouchableOpacity
					onPress={props.addComment}
				>
					<Feather
						name="message-circle"
						size={35}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={props.shareToFeed}
				>
					<Fontisto
						name="share-a"
						size={35}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.timeContainer}>
				<FontAwesome name="clock-o" />
				<Text style={styles.timeText}>
					{formatDate(props.createdAt)}
				</Text>
			</View>
		</View>
	);
};

export default PostButtonsBar;

const styles = StyleSheet.create({
	actionsLineContainer: {
		flexDirection: 'row',
		height: 40,
		justifyContent: 'space-between',
	},
	actionsContainer: {
		width: '50%',
		flexDirection: 'row',
		height: 40,
		justifyContent: 'space-evenly',
		alignContent: 'center',
		alignItems: 'center',
	},
	timeContainer: {
		width: '50%',
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	timeText: {
		marginLeft: 5,
	},
});
