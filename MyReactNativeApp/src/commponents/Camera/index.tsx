import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from 'react';
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

	const [image, setImage] = useState(null);
	const [flash, setFlash] = useState(
		Camera.Constants.FlashMode.off
	);

	const cameraRef = useRef(null);

	const takePicture = async () => {
		if (cameraRef) {
			try {
				const data =
					await cameraRef.current?.takePictureAsync();
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
							icon="switch"
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
									? '#f1f1f1'
									: 'black'
							}
						/>
					</View>
					<View
						style={
							styles.takePictureButton
						}
					>
						<CameraButton
							// title={'take a picture'}
							icon={'camera'}
							onPress={takePicture}
						/>
					</View>
				</Camera>
			) : (
				<View
					style={styles.imageContainer}
				>
					<Image
						source={{ uri: image }}
						style={styles.camera}
					/>
					<View
						style={
							styles.imgeTookButtons
						}
					>
						<CameraButton
							// title="Re-take"
							icon="back"
							onPress={() => {
								setImage(null);
							}}
						/>
						<CameraButton
							// title="Save"
							icon="check"
							onPress={saveImage}
						/>
					</View>
				</View>
			)}
		</View>
	);
};

export default CameraHolder;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
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
		justifyContent: 'space-between',
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
	takePictureButton: {
		marginTop: '125%',
	},
	imageContainer: {
		flex: 1,
	},
	imgeTookButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
});
