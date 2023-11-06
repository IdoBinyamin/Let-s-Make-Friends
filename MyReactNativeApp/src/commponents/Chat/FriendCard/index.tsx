import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, {
	useContext,
	useLayoutEffect,
	useState,
} from 'react';
import {
	collection,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../../../config/FirebaseConfig';
import { useSelector } from 'react-redux';
import { UserInfoProps } from '../../../../config/FirebaseConfig/FirebaseTypes';
import { ChatContext } from '../../../../context';

type Props = {
	createNewChat: any;
};

export const FriendCard = (props: Props) => {
	const [usersList, setUsersList] = useState(
		[]
	);
	const fillterdUsersList = usersList.filter(
		(user) => user !== undefined
	);
	const { rooms } = useContext(ChatContext);
	const currUser = useSelector<UserInfoProps>(
		(state) => state?.user.user
	);

	useLayoutEffect(() => {
		const usersQery = query(
			collection(FIREBASE_DB, 'users'),
			where(
				'displayName',
				'!=',
				currUser?.displayName
			)
		);

		const unsubscribe = onSnapshot(
			usersQery,
			(querySnapShot) =>
				setUsersList(
					querySnapShot.docs.map(
						(user) => {
							if (
								rooms.filter(
									(room) =>
										room.participants.includes(
											user.data()
												.email
										) &&
										room.participants.includes(
											currUser.email
										)
								).length === 1
							) {
								return;
							} else {
								return user.data();
							}
						}
					)
				)
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<View style={styles.container}>
			{fillterdUsersList?.map(
				(user, idx) => (
					<TouchableOpacity
						key={idx}
						style={styles.userCard}
						onPress={() => {
							props.createNewChat(
								user,
								currUser
							);
						}}
					>
						<Image
							source={{
								uri: user?.photoURL,
							}}
							style={
								styles.imageStyle
							}
						/>
						<Text
							style={
								styles.userName
							}
						>
							{user?.displayName}
						</Text>
					</TouchableOpacity>
				)
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
	userCard: {
		height: 60,
		width: '100%',
		marginTop: 10,
		backgroundColor: 'gray',
		borderRadius: 10,
		borderWidth: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignContent: 'center',
		padding: 10,
		flexDirection: 'row',
	},
	imageStyle: {
		height: 40,
		width: 40,
		borderRadius: 25,
	},
	userName: {
		marginLeft: 15,
		fontSize: 15,
		fontWeight: 'bold',
	},
});
