import { View, StyleSheet, LayoutRectangle } from "react-native";
import React from "react";
import Square from "../components/SquareComponent";
import { ShadowTile, letter } from "../components/TileComponent";
import {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureChangeEventPayload,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import DragAndDrop from "../../utils/DragAndDrop";
import Animated, {
	SharedValue,
	interpolateColor,
	runOnJS,
	runOnUI,
	useAnimatedProps,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";
import Board from "../components/BoardComponent";
import DragAndDropTile from "./DragAndDropTile";

const rowHeight = 50;
const colHeight = rowHeight;
const rowGap = 4;
const colGap = rowGap;

const DragAndDropTileTest = (): JSX.Element => {
	const [hasDropped, setHasDropped] = React.useState(false);
	const [hasPicked, setHasPicked] = React.useState(false);
	const letter: SharedValue<letter> = useSharedValue("H");
	const tileLength: SharedValue<number> = useSharedValue(50);

	const tileIsDragging: SharedValue<boolean> = useSharedValue(false);
	const tileDimensions: SharedValue<
		{ x: number; y: number; width: number; height: number } | undefined
	> = useSharedValue({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const tileDropped: SharedValue<{ letter: letter; tileLength: number } | undefined> =
		useSharedValue(undefined);

	const tilePicked: SharedValue<{ letter: letter; tileLength: number } | undefined> =
		useSharedValue(undefined);

	useDerivedValue(() => {
		if (tilePicked && tilePicked.value) {
			letter.value = tilePicked.value.letter;
			tileLength.value = tilePicked.value.tileLength;
		}
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Board
				isTileDragging={tileIsDragging}
				tileDimensions={tileDimensions}
				droppedTile={tileDropped}
			/>

			{(!hasDropped || hasPicked) && (
				<DragAndDropTile
					letter={letter.value}
					tileLength={tileLength.value}
					tileType="shadow"
					tileDragStarted={(
						event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
					) => {
						tileIsDragging.value = true;
						tileDropped.value = undefined;
						setHasDropped(false);
					}}
					tileDragging={(
						event: GestureUpdateEvent<
							PanGestureHandlerEventPayload & PanGestureChangeEventPayload
						>,
						tileDim: { x0: number; y0: number; width: number; height: number }
					) => {
						tileDimensions.value = {
							x: tileDim.x0,
							y: tileDim.y0,
							width: tileDim.width,
							height: tileDim.height,
						};
					}}
					tileDragEnded={(
						event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
					) => {
						tileIsDragging.value = false;
						tileDimensions.value = undefined;
						tileDropped.value = {
							letter: letter.value,
							tileLength: tileLength.value,
						};
						setHasDropped(true);
					}}
					style={{ position: "absolute", bottom: 100 }}
				/>
			)}
		</View>
	);
};

export default DragAndDropTileTest;
