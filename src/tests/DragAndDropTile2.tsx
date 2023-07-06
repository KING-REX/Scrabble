import { View, Text, LayoutRectangle, ViewStyle, LayoutChangeEvent } from "react-native";
import React, { useEffect } from "react";
import {
	GestureStateChangeEvent,
	PanGestureHandlerEventPayload,
	GestureUpdateEvent,
	PanGestureChangeEventPayload,
	LongPressGestureHandlerEventPayload,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import DragAndDrop from "../../utils/DragAndDrop";
import Tile, {
	InsetShadowTile,
	NeoShadowTile,
	ShadowTile,
	TileProps,
	letter,
} from "../components/TileComponent";
import Animated, {
	AnimateStyle,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { BOARD_LENGTH, SIZE, gap, toIndices, toTranslation } from "../helpers/Notation";

type TileType = "normal" | "shadow";

type DragAndDropTileProps = {
	tileType?: TileType;
	tileDragStarted?: Function;
	tileDragging?: Function;
	tileDragEnded?: Function;
	tileLongPressStarted?: Function;
	tileLongPressEnded?: Function;
	style?: ViewStyle;
	animatedStyle?: AnimateStyle<ViewStyle>;
	enableDrag?: boolean;
	tileDim?: Function;
};

const DragAndDropTile2 = ({
	letter,
	tileLength,
	tileType,
	tileDragStarted,
	tileDragging,
	tileDragEnded,
	tileLongPressStarted,
	tileLongPressEnded,
	style,
	animatedStyle,
	enableDrag,
	tileDim,
	onLayout,
}: DragAndDropTileProps & TileProps): JSX.Element => {
	const initialX = useSharedValue(-1);
	const initialY = useSharedValue(-1);

	const initialTileOffset = ({ x, y }: LayoutRectangle) => {
		initialX.value = x;
		initialY.value = y;
	};

	const dropTile = ({ row, col }: { row: number; col: number }) => {
		let validMove: boolean = !(row < 0 || row > 14 || col < 0 || col > 14);

		const { x, y } = toTranslation({ row, col });

		translateX.value = withTiming(validMove ? x : initialX.value);
		translateY.value = withTiming(validMove ? y : initialY.value);

		console.log("Translating to: " + x, y);
	};

	const scaleX = useSharedValue(1);
	const scaleY = useSharedValue(1);

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const offsetX = useSharedValue(0);
	const offsetY = useSharedValue(0);

	const panGesture = Gesture.Pan();
	panGesture
		.onStart(() => {
			offsetX.value = translateX.value;
			offsetY.value = translateY.value;

			scaleX.value = withTiming(2);
			scaleY.value = withTiming(2);
		})
		.onChange(({ translationX, translationY }) => {
			translateX.value = translationX + offsetX.value;
			translateY.value = translationY + offsetY.value;
			// console.log("Changing...");
		})
		.onEnd(() => {
			const to = toIndices({ x: translateX.value, y: translateY.value });
			console.log("Indices dropped[row, col]: " + to.row, to.col);
			dropTile(to);

			scaleX.value = withTiming(1);
			scaleY.value = withTiming(1);
		});

	const styles = useAnimatedStyle(() => {
		return {
			position: "absolute",
			top: 0,
			left: 0,
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scaleX: scaleX.value },
				{ scaleY: scaleY.value },
			],
		};
	});
	return (
		<>
			<GestureDetector gesture={panGesture}>
				<Animated.View style={styles}>
					<NeoShadowTile
						letter={letter}
						tileLength={tileLength}
						onLayout={initialTileOffset}
					/>
				</Animated.View>
			</GestureDetector>
			{/* <DragAndDrop
				enableDrag={enableDrag}
				onDragStart={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
					tileOffsetY = event.absoluteY - tileAbsoluteY;
					tileOffsetX = event.absoluteX - tileAbsoluteX;
					// console.log("Event absolute X:", event.absoluteX);
					// console.log("Event absolute Y:", event.absoluteY);
					// console.log("Tile absolute X:", tileAbsoluteX);
					// console.log("Tile absolute Y:", tileAbsoluteY);
					// console.log("Tile offset X: " + tileOffsetX);
					// console.log("Tile offset Y: " + tileOffsetY);
					console.log("Picked at:", event.absoluteX, event.absoluteY);
					tileDragStarted ? tileDragStarted(event) : {};
				}}
				onDrag={(
					event: GestureUpdateEvent<
						PanGestureHandlerEventPayload & PanGestureChangeEventPayload
					>,
					obj: { x: SharedValue<number>; y: SharedValue<number> }
				) => {
					// console.log("Velocity[X&Y]:", event.velocityX, event.velocityY);
					// console.log(yToRowIndex(event.absoluteY))

					// console.log("Tile Absolute Y:", tileAbsoluteY);
					tileAbsoluteX = event.absoluteX - tileOffsetX;
					tileAbsoluteY = event.absoluteY - tileOffsetY;
					let roundedX: number = Math.round(tileAbsoluteX / (SIZE + gap));
					let roundedY: number = Math.round(tileAbsoluteY / (SIZE + gap));

					const { row, col } = toIndices({
						x: tileAbsoluteX / (SIZE + gap),
						y: tileAbsoluteY / (SIZE + gap),
					});

					rowIndex.value = row;
					rowIndex.value = roundedY === -0 ? 0 : roundedY < BOARD_LENGTH ? roundedY : -1;

					colIndex.value = col;
					colIndex.value = roundedX === -0 ? 0 : roundedX < BOARD_LENGTH ? roundedX : -1;

					// console.log("Round:", round);
					// console.log("Col Index:", colIndex.value);
					// console.log("Row Index:", rowIndex.value);

					changedTileOffset(tileAbsoluteX, tileAbsoluteY);

					tileDragging ? tileDragging(event, tileDimensions, obj) : {};
				}}
				onDrop={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
					console.log("Dropped at:", event.absoluteX, event.absoluteY);
					console.log("Tile absolute coord:", tileAbsoluteX, tileAbsoluteY);
					tileDragEnded ? tileDragEnded() : {};
				}}
				onLongPressStarted={(
					event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>
				) => {
					console.log(
						"Tile lp started at coord: " + tileAbsoluteX + ", " + tileAbsoluteY
					);
					tileLongPressStarted
						? tileLongPressStarted({
								event,
								tileX: tileAbsoluteX,
								tileY: tileAbsoluteY,
						  })
						: {};
				}}
				onLongPressEnded={(
					event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>
				) => {
					console.log("Tile lp ended!");
					tileLongPressEnded ? tileLongPressEnded(event) : {};
				}}
				onLayout={(event) => {
					tileAbsoluteX = event.nativeEvent.layout.x;
					console.log("TAX:", tileAbsoluteX);
					tileAbsoluteY = event.nativeEvent.layout.y;
					console.log("TAY:", tileAbsoluteY);
					onLayout ? onLayout(event) : {};
				}}
				style={[style, { zIndex: 50 }]}
				animatedStyle={animatedStyle}>
				{contents()}
			</DragAndDrop> */}
		</>
	);
};

export default DragAndDropTile2;
