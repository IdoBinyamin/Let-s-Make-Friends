import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../consts';
import lengConfig from '../../comons/leng';

type Props = {
	photoURL: string;
	isProfilePage?: boolean;
	moveToProfile?: () => void;
};

const SearchLine = ({
	photoURL,
	moveToProfile,
	isProfilePage = false,
}: Props) => {
	return (
		<>
			<View
				style={
					!isProfilePage
						? styles.container
						: styles.containerProfile
				}
			>
				{!isProfilePage ? (
					<TouchableOpacity
						onPress={moveToProfile}
					>
						<Avatar
							size={32}
							url={photoURL}
							style={
								styles.profilePhoto
							}
						/>
					</TouchableOpacity>
				) : (
					<View>
						<Avatar
							size={32}
							url={photoURL}
							style={
								styles.profilePhoto
							}
						/>
					</View>
				)}
				<TextInput
					placeholder={
						lengConfig.leng.search
					}
					style={styles.inputSearch}
				/>
				<TouchableOpacity
					style={styles.searchBtn}
					onPress={() => {
						console.log(
							'serching...'
						);
					}}
				>
					<Ionicons
						name="search"
						size={28}
						color={'#2ce4c5'}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.notification}
					onPress={() => {
						console.log('notifay!');
					}}
				>
					<Ionicons
						name="notifications-outline"
						size={26}
					/>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default SearchLine;

const styles = StyleSheet.create({
	container: {
		height: 120,
		paddingTop: 55,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 3,
		position: 'relative',
	},
	profilePhoto: {
		marginRight: 10,
	},
	inputSearch: {
		height: 32,
		width: 256,
		borderColor: '#C7C7C7',
		borderWidth: 1,
		borderRadius: 40,
		padding: 10,
	},
	searchBtn: {
		marginLeft: -40,
	},
	notification: {
		height: 25,
		width: 25,
		marginLeft: 25,
	},
	containerProfile: {
		height: 60,
		flexDirection: 'row',
		backgroundColor: 'white',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
