import { View, Text, ViewProps } from "react-native";
import React from "react";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type DragAndDropProps = {
	children: JSX.Element | JSX.Element[] | null;
	enableDrag?: boolean;
	onDragStart?: Function;
	onDrag?: Function;
	onDrop?: Function;
	onLongPressStarted?: Function;
	onLongPressEnded?: Function;
};

const DragAndDrop = ({
	children,
	enableDrag,
	onDragStart,
	onDrag,
	onDrop,
	onLongPressStarted,
	onLongPressEnded,
	onLayout,
	style,
}: DragAndDropProps & ViewProps): JSX.Element => {
	const x = useSharedValue(0);
	const y = useSharedValue(0);

	const xOffset = useSharedValue(0);
	const yOffset = useSharedValue(0);

	const drag = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onStart: (event) => {
			console.log("DRAGGING STARTED!");
			onDragStart ? onDragStart(event) : {};
		},
		onActive: (event) => {
			x.value = event.translationX;
			y.value = event.translationY;
			onDrag ? onDrag(event) : {};
			console.log("DRAGGING:", event.translationX, event.translationY);
		},
		onEnd: (event) => {
			console.log("DROPPED: ", event.translationX, event.translationY);
			onDrop ? onDrop(event) : {};
		},
	});

	/* ----------------------------------------------------------------------- */

	const panGesture = Gesture.Pan();
	panGesture
		.onBegin((event) => {
			// console.log("X value at the start is:", x.value);
		})
		.onStart((event) => {
			// console.log("Drag started!");
			x.value = xOffset.value;
			y.value = yOffset.value;
			// console.log("X is:", x.value);
			// console.log("Y is:", y.value);
			onDragStart ? onDragStart(event) : {};
		})
		.onChange((event) => {
			x.value = xOffset.value + event.translationX;
			y.value = yOffset.value + event.translationY;
			// console.log("Dragging: ", x.value, y.value);
			onDrag ? onDrag(event) : {};
		})
		.onEnd((event) => {
			// console.log("Dropped: ", event.translationX, event.translationY);
			xOffset.value = x.value;
			yOffset.value = y.value;
			onDrop ? onDrop(event) : {};
		});

	const longPressGesture = Gesture.LongPress();
	longPressGesture
		.onStart((event) => {
			console.log("Long Press Started");
			onLongPressStarted ? onLongPressStarted() : {};
		})
		.onEnd((event) => {
			console.log("Long Press Ended");
			onLongPressEnded ? onLongPressEnded() : {};
		});

	const simultaneous = Gesture.Simultaneous(panGesture, longPressGesture);

	return (
		// <GestureHandlerRootView>
		//     <PanGestureHandler
		//         onGestureEvent={drag}
		//     >
		//         <Animated.View
		//             style={useAnimatedStyle(() => ({
		//                 transform: [
		//                     { translateX: x.value },
		//                     { translateY: y.value },
		//                 ]
		//             }))}
		//         >
		//             {children}
		//         </Animated.View>
		//     </PanGestureHandler>
		// </GestureHandlerRootView>

		/* ----------------------------------------------------------------------- */

		<GestureDetector
			gesture={
				enableDrag === true || enableDrag === undefined ? simultaneous : longPressGesture
			}>
			<Animated.View
				onLayout={(event) => (onLayout ? onLayout(event) : undefined)}
				style={[
					style,
					useAnimatedStyle(() => ({
						transform: [{ translateX: x.value }, { translateY: y.value }],
					})),
				]}>
				{children}
			</Animated.View>
		</GestureDetector>
	);
};

export default DragAndDrop;
