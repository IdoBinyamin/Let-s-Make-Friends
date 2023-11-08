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

// export interface IAppProps {}

export function UploadScreen() {
	const currUser = useSelector(
		(state) => state?.user.user
	);

	const [isLoading, setIsLoading] =
		useState(false);

	const navigation =
		useNavigation<RouterProps>();

	const [desc, setDesc] = useState('');

	const [images, setImages] = useState([]);

	const createNewPost = async () => {
		const id = `${new Date(
			Date.now()
		).toString()}`;

		const newPost = {
			_id: id,
			user: currUser,
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
				setImages([]);
				navigation.navigate(
					lengConfig.screens.feedScreen
				);
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
				<PostForm
					images={images}
					desc={desc}
					setDesc={setDesc}
					postImagesHandler={
						postImagesHandler
					}
					createNewPost={createNewPost}
				/>
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
});
