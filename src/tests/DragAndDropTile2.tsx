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
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import {
	BOARD_LENGTH,
	INVALID,
	SIZE,
	boardOffsetX,
	boardOffsetY,
	gap,
	toIndices,
	toTranslation,
} from "../helpers/Notation";

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
	const initialOffsetX = useSharedValue(30);
	const initialIOffsetY = useSharedValue(50);
	const initialScaleValue = 2;

	const initialTileOffset = (event: LayoutChangeEvent) => {
		const x = event.nativeEvent.layout.x;
		const y = event.nativeEvent.layout.y;
		console.log("Initial Tile Offsets: " + x, y);
		initialOffsetX.value = x;
		initialIOffsetY.value = y;
	};

	const dropTile = ({
		indicesObj: { row, col },
		offsets,
	}: {
		indicesObj: { row: number; col: number };
		offsets?: { offsetX: number; offsetY: number };
	}) => {
		let validMove: boolean = !(row < 0 || row > 14 || col < 0 || col > 14);

		const { x, y } = toTranslation({
			indicesObj: { row, col },
			offsets: { offsetX: initialOffsetX.value, offsetY: initialIOffsetY.value },
		});

		translateX.value = withTiming(validMove ? x : initialOffsetX.value);
		translateY.value = withTiming(validMove ? y : initialIOffsetY.value);

		scaleX.value = withTiming(validMove ? 1 : initialScaleValue);
		scaleY.value = withTiming(validMove ? 1 : initialScaleValue);

		console.log("Translating to: " + x, y);
	};

	const opacity = useSharedValue(1);

	const scaleX = useSharedValue(initialScaleValue);
	const scaleY = useSharedValue(initialScaleValue);

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const offsetX = useSharedValue(0);
	const offsetY = useSharedValue(0);

	const isDragging = useSharedValue(false);

	const panGesture = Gesture.Pan();
	panGesture
		.onStart(() => {
			offsetX.value = translateX.value;
			offsetY.value = translateY.value;

			scaleX.value = withTiming(2);
			scaleY.value = withTiming(2);

			opacity.value = 0.5;

			isDragging.value = true;
		})
		.onChange(({ translationX, translationY }) => {
			translateX.value = translationX + offsetX.value;
			translateY.value = translationY + offsetY.value;
		})
		.onEnd(() => {
			const to = toIndices({
				translationObj: { x: translateX.value, y: translateY.value },
				offsets: { offsetX: initialOffsetX.value, offsetY: initialIOffsetY.value },
			});
			dropTile(to);

			opacity.value = 1;

			isDragging.value = false;
		});

	const underlay = useAnimatedStyle(() => {
		const obj = toTranslation(
			toIndices({
				translationObj: { x: translateX.value, y: translateY.value },
				offsets: { offsetX: initialOffsetX.value, offsetY: initialIOffsetY.value },
			})
		);
		console.log("Obj values:", obj.x, obj.y);
		// console.log(toIndices({ x: translateX.value, y: translateY.value }));
		// console.log(translateX.value, translateY.value);

		return {
			position: "absolute",
			height: SIZE,
			width: SIZE,
			backgroundColor: "#ddff00",
			// transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
			transform: [{ translateX: obj.x }, { translateY: obj.y }],
			opacity: obj.x !== INVALID && obj.y !== INVALID && isDragging.value ? 0.7 : 0,
		};
	});

	const styles = useAnimatedStyle(() => ({
		position: "absolute",
		top: initialIOffsetY.value,
		left: initialOffsetX.value,
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ scaleX: scaleX.value },
			{ scaleY: scaleY.value },
		],
		opacity: opacity.value,
	}));
	return (
		<>
			<Animated.View style={underlay} />
			<GestureDetector gesture={panGesture}>
				<Animated.View style={styles} onLayout={initialTileOffset}>
					<NeoShadowTile letter={letter} tileLength={tileLength} />
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
