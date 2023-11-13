import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RouterProps } from '../../models';
import { FIREBASE_DB } from '../../../config/FirebaseConfig';
import lengConfig from '../../comons/leng';
import { pickImage } from '../../../util';
import { PostForm } from '../../commponents/PostCard/PostForm';

type UploadScreenProps = {
	isProfile?: boolean;
};

export function UploadScreen({
	isProfile,
}: UploadScreenProps) {
	const currUser = useSelector(
		(state) => state?.user.user
	);

	const [isLoading, setIsLoading] =
		useState(false);

	const navigation =
		useNavigation<RouterProps>();

	const [desc, setDesc] = useState('');
	const [title, setTitle] = useState('');

	const [images, setImages] = useState([]);

	const createNewPost = async () => {
		const id = `${new Date(
			Date.now()
		).toString()}`;
		if (title === '' && images.length === 0) {
			return alert('Post is not valid!');
		}

		const newPost = {
			_id: id,
			displayName: currUser.displayName,
			user: currUser,
			title: title,
			desc: desc,
			likes: [],
			images: images,
			comments: [],
		};
		setIsLoading(true);

		await setDoc(
			doc(FIREBASE_DB, 'posts', id),
			newPost
		)
			.then(() => {
				setIsLoading(false);
				setDesc('');
				setTitle('');
				setImages([]);
				if (!isProfile) {
					navigation.navigate(
						lengConfig.screens
							.feedScreen
					);
				} else {
					navigation.navigate(
						lengConfig.screens
							.profileScreen
					);
				}
			})
			.catch((error: any) => {
				setIsLoading(false);
				alert('Error: ', error.message);
			});
	};

	const postImagesHandler = async () => {
		try {
			const result = await pickImage();
			if (!result.canceled) {
				const newImagesArray = [
					...images,
					{ uri: result.assets[0].uri },
				];
				setImages(newImagesArray);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
		>
			{isLoading ? (
				<>
					<View
						style={
							styles.loadingContainer
						}
					>
						<ActivityIndicator
							size={'large'}
							color={'#2CE4C5'}
						/>
					</View>
				</>
			) : (
				<View
					style={styles.formContainer}
				>
					<PostForm
						images={images}
						desc={desc}
						title={title}
						setTitle={setTitle}
						setDesc={setDesc}
						postImagesHandler={
							postImagesHandler
						}
						createNewPost={
							createNewPost
						}
					/>
				</View>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	loadingContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	formContainer: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'gray',
	},
});
