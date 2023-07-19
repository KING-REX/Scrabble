import { LayoutChangeEvent } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Tile, { NeoShadowTile, TileProps } from "./TileComponent";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { INVALID, SIZE, toIndices, toTranslation } from "../helpers/Notation";

type DragAndDropTileProps = {
	index?: number;
	initialOffset?: {
		offsetX: { value: number; from: "left" | "right" };
		offsetY: { value: number; from: "top" | "bottom" };
	};
	reset?: boolean;
	// translate?: { translateX: SharedValue<number>; translateY: SharedValue<number> };
	// scale?: { scaleX: SharedValue<number>; scaleY: SharedValue<number> };
};

const DragAndDropTile2 = ({
	letter,
	tileLength,
	initialOffset,
	index,
}: DragAndDropTileProps & TileProps): JSX.Element => {
	// console.log("InitialOffset?:", JSON.stringify(initialOffset));
	const initialOffsetX = useSharedValue(initialOffset ? initialOffset.offsetX.value : 30);
	const initialOffsetY = useSharedValue(initialOffset ? initialOffset.offsetY.value : 150);

	const offsetYFrom = useSharedValue(initialOffset ? initialOffset.offsetY.from : "top");
	const offsetXFrom = useSharedValue(initialOffset ? initialOffset.offsetX.from : "right");

	const initialScaleValue = 2;

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const scaleX = useSharedValue(initialScaleValue);
	const scaleY = useSharedValue(initialScaleValue);

	React.useEffect(() => {
		return () => {
			translateX.value = withTiming(0, {
				duration: index !== undefined ? 1000 + index * 250 : undefined,
			});
			translateY.value = withTiming(0, {
				duration: index !== undefined ? 1000 + index * 250 : undefined,
			});
			scaleX.value = withTiming(initialScaleValue);
			scaleY.value = withTiming(initialScaleValue);
		};
	});

	const initialTileOffset = (event: LayoutChangeEvent) => {
		const x = event.nativeEvent.layout.x;
		const y = event.nativeEvent.layout.y;
		// console.log("Initial Tile Offsets: " + x, y);
		initialOffsetX.value = x;
		initialOffsetY.value = y;
		offsetYFrom.value = "top";
		offsetXFrom.value = "left";
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
			offsets: { offsetX: initialOffsetX.value, offsetY: initialOffsetY.value },
		});

		translateX.value = withTiming(validMove ? x : 0);
		translateY.value = withTiming(validMove ? y : 0);

		scaleX.value = withTiming(validMove ? 1 : initialScaleValue);
		scaleY.value = withTiming(validMove ? 1 : initialScaleValue);

		// console.log("Translating to: " + x, y);
	};

	const opacity = useSharedValue(1);

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
				offsets: { offsetX: initialOffsetX.value, offsetY: initialOffsetY.value },
			});
			dropTile(to);

			opacity.value = 1;

			isDragging.value = false;
		});

	const underlay = useAnimatedStyle(() => {
		const obj = toTranslation(
			toIndices({
				translationObj: { x: translateX.value, y: translateY.value },
				offsets: { offsetX: initialOffsetX.value, offsetY: initialOffsetY.value },
			})
		);
		// console.log("Obj values:", obj.x, obj.y);
		// console.log(toIndices({ x: translateX.value, y: translateY.value }));
		// console.log(translateX.value, translateY.value);

		return {
			position: "absolute",
			[offsetYFrom.value]: initialOffsetY.value,
			[offsetXFrom.value]: initialOffsetX.value,
			height: SIZE,
			width: SIZE,
			backgroundColor: "#ddff00",
			// transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
			transform: [{ translateX: obj.x }, { translateY: obj.y }],
			opacity: obj.x !== INVALID && obj.y !== INVALID && isDragging.value ? 0.7 : 0,
		};
	});

	const styles = useAnimatedStyle(() => {
		return {
			position: "absolute",
			[offsetYFrom.value]: initialOffsetY.value,
			[offsetXFrom.value]: initialOffsetX.value,
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scaleX: scaleX.value },
				{ scaleY: scaleY.value },
			],
			opacity: opacity.value,
		};
	});
	return (
		<>
			<Animated.View style={underlay} />
			<GestureDetector gesture={panGesture}>
				<Animated.View style={styles} onLayout={initialTileOffset}>
					<NeoShadowTile letter={letter} tileLength={tileLength} />
				</Animated.View>
			</GestureDetector>
		</>
	);
};

export default DragAndDropTile2;
