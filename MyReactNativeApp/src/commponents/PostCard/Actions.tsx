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

type Props = {};

const Actions = (props: Props) => {
	return (
		<View style={styles.actionsLineContainer}>
			<View style={styles.actionsContainer}>
				<TouchableOpacity>
					<AntDesign
						name="hearto"
						size={35}
					/>
				</TouchableOpacity>
				<Text>100K</Text>
				<TouchableOpacity>
					<Feather
						name="message-circle"
						size={35}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Fontisto
						name="share-a"
						size={35}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.timeContainer}>
				<FontAwesome name="clock-o" />
				<Text style={styles.timeText}>
					15 Minutes ago
				</Text>
			</View>
		</View>
	);
};

export default Actions;

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
