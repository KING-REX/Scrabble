import { View, StyleSheet, LayoutRectangle } from "react-native";
import React from "react";
import Square from "../components/SquareComponent";
import { ShadowTile } from "../components/TileComponent";
import {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureChangeEventPayload,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import DragAndDrop from "../../utils/DragAndDrop";
import Animated, {
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
	// const [tileIsDragging, setTileIsDragging] = React.useState(false);
	// const tileIsDragging = React.useRef(false);

	const tileIsDragging = useSharedValue(false);

	const [tileX0, tileX1, tileHeight, tileWidth] = [1, 2, 3, 4];

	const [boardX0, boardX1, boardY0, boardY1] = [1, 2, 3, 4];

	const animatedTileIsDragging = useAnimatedStyle(() => {
		if (tileIsDragging.value)
			return {
				backgroundColor: "#000",
			};
		else
			return {
				backgroundColor: "#AAA",
			};
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Board
				// isTileDragging={handle(tileIsDragging.value)}
				isTD={tileIsDragging}
				animated={animatedTileIsDragging}
			/>

			{/* WHAT THE BOARD LISTENS FOR...
                1. A DragAndDrop tile prolly!
            */}

			<DragAndDropTile
				letter="C"
				tileLength={45}
				tileType="shadow"
				tileDragStarted={(
					event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
				) => {
					// setTileIsDragging(true);
					// tileIsDragging.current = true;
					tileIsDragging.value = true;
				}}
				tileDragEnded={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
					// setTileIsDragging(false);
					// tileIsDragging.current = false;
					tileIsDragging.value = false;
				}}
			/>
		</View>
	);
};

export default DragAndDropTileTest;
