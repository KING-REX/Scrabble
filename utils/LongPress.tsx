import { View, Text } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type LongPressProps = {
	children: JSX.Element | JSX.Element[] | null;
	onLongPressStart?: Function;
	onLongPressEnd?: Function;
};

const LongPress = ({ children, onLongPressStart, onLongPressEnd }: LongPressProps) => {
	const longPressGesture = Gesture.LongPress()
		.onStart(onLongPressStart ? onLongPressStart() : undefined)
		.onEnd(onLongPressEnd ? onLongPressEnd() : undefined);
	return <GestureDetector gesture={longPressGesture}>{children}</GestureDetector>;
};

export default LongPress;
