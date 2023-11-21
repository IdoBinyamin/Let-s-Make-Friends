import React, { useRef } from 'react';
import {
	View,
	PanResponder,
	Animated,
} from 'react-native';

const SlideComponent = ({
	children,
	onSlideComplete,
}: any) => {
	const pan = useRef(
		new Animated.ValueXY()
	).current;
	const [dx, dy] = [
		useRef(new Animated.Value(0)),
		useRef(new Animated.Value(0)),
	];
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (
			event,
			gestureState
		) => {
			Animated.event(
				[
					null,
					{
						dx: dx.current,
						dy: dy.current,
					},
				],
				{
					useNativeDriver: false,
				}
			)(event, gestureState);
		},
		onPanResponderRelease: (
			_,
			gestureState
		) => {
			const swipeThreshold = 70; // Adjust as needed
			console.log(dx.current);

			if (
				gestureState.dx <
					-swipeThreshold &&
				typeof onSlideComplete ===
					'function'
			) {
				onSlideComplete();
				dx.current.setValue(0);
			}
		},
	});

	// Define the range for horizontal and vertical movement
	const minX = -50;
	const maxX = 0;
	const minY = 0;
	const maxY = 0;

	// Use interpolate to limit the movement within the specified range
	pan.x = dx.current.interpolate({
		inputRange: [minX, maxX],
		outputRange: [minX, maxX],
		extrapolate: 'clamp',
	});

	pan.y = dy.current.interpolate({
		inputRange: [minY, maxY],
		outputRange: [minY, maxY],
		extrapolate: 'clamp',
	});

	return (
		<Animated.View
			style={{
				transform: [
					{ translateX: pan.x },
					{ translateY: pan.y },
				],
			}}
			{...panResponder.panHandlers}
		>
			{children}

			<View
				style={{
					width: 70,
					height: 30,
					position: 'relative',
					backgroundColor: '#E8E9EB',
				}}
			/>
		</Animated.View>
	);
};

export default SlideComponent;
