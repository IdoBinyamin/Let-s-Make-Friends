import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, {
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import { CameraButton } from '../Generic/index';

const CameraHolder = () => {
	const [type, setType] = useState(
		CameraType.back
	);
	const [permission, setPermission] =
		useState(null);

	const [image, setImage] = useState(null);
	const [flash, setFlash] = useState(
		Camera.Constants.FlashMode.off
	);

	const cameraRef = useRef(null);

	useEffect(() => {
		(async () => {
			MediaLibrary.requestPermissionsAsync();
			const cameraStatus =
				await Camera.requestCameraPermissionsAsync();
			setPermission(
				cameraStatus.status === 'granted'
			);
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef) {
			try {
				const data =
					await cameraRef.current.takePictureAsync();
				console.log(data);
				setImage(data.uri);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const saveImage = async () => {
		if (image) {
			try {
				await MediaLibrary.createAssetAsync(
					image
				);
				alert('Picture save');
				setImage(null);
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (permission === false) {
		return <Text>No access to camera</Text>;
	}

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back
				? CameraType.front
				: CameraType.back
		);
	}
	function toggleCameraFlash() {
		setFlash((current) =>
			current ===
			Camera.Constants.FlashMode.off
				? Camera.Constants.FlashMode.on
				: Camera.Constants.FlashMode.off
		);
	}
	return (
		<View style={styles.container}>
			{!image ? (
				<Camera
					style={styles.camera}
					type={type}
					flashMode={flash}
					ref={cameraRef}
				>
					<View style={styles.flash}>
						<CameraButton
							icon="retweet"
							onPress={
								toggleCameraType
							}
						/>
						<CameraButton
							icon="flash"
							onPress={
								toggleCameraFlash
							}
							color={
								flash ===
								Camera.Constants
									.FlashMode.off
									? 'gray'
									: '#f1f1f1'
							}
						/>
					</View>
				</Camera>
			) : (
				<Image
					source={{ uri: image }}
					style={styles.camera}
				/>
			)}
			{image ? (
				<View
					style={{
						flexDirection: 'row',
						justifyContent:
							'space-between',
						paddingHorizontal: 15,
					}}
				>
					<CameraButton
						title="Re-take"
						icon="retweet"
						onPress={() => {
							setImage(null);
						}}
					/>
					<CameraButton
						title="Save"
						icon="check"
						onPress={saveImage}
					/>
				</View>
			) : (
				<CameraButton
					title={'take a picture'}
					icon={'camera'}
					onPress={takePicture}
				/>
			)}
		</View>
	);
};

export default CameraHolder;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	flash: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 30,
	},
	buttonContainer: {
		flexDirection: 'row',
		// backgroundColor: 'transparent',
		justifyContent: 'space-between',
		// margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
