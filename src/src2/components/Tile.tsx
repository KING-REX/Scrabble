import { View, Text } from "react-native";
import React from "react";
import { Gesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const Tile = () => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const offsetX = useSharedValue(0);
	const offsetY = useSharedValue(0);

	const panGesture = Gesture.Pan();
	panGesture
		.onStart(() => {
			offsetX.value = translateX.value;
			offsetY.value = translateY.value;
		})
		.onChange(({ translationX, translationY }) => {
			translateX.value = translationX + offsetX.value;
			translateY.value = translationY + offsetY.value;
		});

	const style = useAnimatedStyle(() => {
		return {
			position: "absolute",
			transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
		};
	});

	return <Animated.View style={style}></Animated.View>;
};

export default Tile;
