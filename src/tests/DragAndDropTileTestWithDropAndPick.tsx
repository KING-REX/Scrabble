import { View, StyleSheet, LayoutRectangle, ViewProps, ViewStyle } from "react-native";
import React from "react";
import Square from "../components/Square";
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
	AnimateStyle,
	SharedValue,
	interpolateColor,
	runOnJS,
	runOnUI,
	useAnimatedProps,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";
import Board from "../components/TrashBoard";
import DragAndDropTile from "./DragAndDropTile";

const rowHeight = 50;
const colHeight = rowHeight;
const rowGap = 4;
const colGap = rowGap;

type ContentProps = {
	letter: letter;
	tileLength: number;
	tileX: number;
	tileY: number;
};

const DragAndDropTileTest = (): JSX.Element => {
	const [hasDropped, setHasDropped] = React.useState(false);
	const [hasPicked, setHasPicked] = React.useState(false);

	// const [rowIndex, setRowIndex] = React.useState(-1);
	// const [colIndex, setColIndex] = React.useState(-1);

	// const [coordinateX, setCoordinateX] = React.useState(-1);
	// const [coordinateY, setCoordinateY] = React.useState(-1);

	// const coordinateX = useSharedValue(-1);
	// const coordinateY = useSharedValue(-1);

	// const translationX = useSharedValue(0);
	// const translationY = useSharedValue(0);

	const letter: SharedValue<letter> = useSharedValue("H");
	const tileLength: SharedValue<number> = useSharedValue(50);

	// const tileOffset = useSharedValue<{ x: number; y: number }>({
	// 	x: -1,
	// 	y: -1,
	// });

	// const [tileOffset, setTileOffset] = React.useState({
	// 	x: -1,
	// 	y: -1,
	// });

	const content = (
		pickedTile?: ContentProps,
		style?: ViewStyle,
		animatedStyle?: AnimateStyle<ViewStyle>
	): JSX.Element => {
		return (
			<DragAndDropTile
				onLayout={() => {
					if (pickedTile) {
						setHasPicked(true);
					}
				}}
				//prettier-ignore
				letter={(pickedTile && pickedTile.letter) ? pickedTile.letter : letter.value}
				//prettier-ignore
				tileLength={(pickedTile && pickedTile.tileLength) ? pickedTile.tileLength : tileLength.value}
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
				tileDragEnded={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
					tileIsDragging.value = false;
					tileDropped.value = {
						//prettier-ignore
						letter: (pickedTile && pickedTile.letter) ? pickedTile.letter : letter.value,
						// letter: letter.value,
						//prettier-ignore
						tileLength: (pickedTile && pickedTile.tileLength) ? pickedTile.tileLength : tileLength.value,
						// tileLength: tileLength.value,
						//prettier-ignore
						tileX: (pickedTile && pickedTile.tileX) ? pickedTile.tileX : tileDimensions.value!.x,
						// tileX: tileDimensions.value!.x,
						//prettier-ignore
						tileY: (pickedTile && pickedTile.tileY) ? pickedTile.tileY : tileDimensions.value!.y,
						// tileY: tileDimensions.value!.y,
					};
					tileDimensions.value = undefined;
					setHasDropped(true);
				}}
				style={style}
				animatedStyle={animatedStyle}
			/>
		);
	};

	const [pickedT, setPickedT] = React.useState<JSX.Element | undefined>(
		content(undefined, { position: "absolute", bottom: 100 })
	);

	const pickTileFunc = (tile: {
		letter: letter;
		tileLength: number;
		tileX: number;
		tileY: number;
	}) => {
		console.log("Picked TileX&Y:", tile.tileX, tile.tileY);
		setPickedT(
			content(tile, {
				position: "absolute",
				top: tile.tileY,
				left: tile.tileX,
			})
		);
		reset();
	};

	const reset = () => {
		tileDropped.value = undefined;
		tileDimensions.value = undefined;
		setHasDropped(false);
		tileIsDragging.value = false;
		tileDimensions.value = undefined;
		tilePicked.value = undefined;
	};

	const tileIsDragging: SharedValue<boolean> = useSharedValue(false);
	const tileDimensions: SharedValue<
		{ x: number; y: number; width: number; height: number } | undefined
	> = useSharedValue({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const tileDropped: SharedValue<
		{ letter: letter; tileLength: number; tileX: number; tileY: number } | undefined
	> = useSharedValue(undefined);

	const tilePicked: SharedValue<{ letter: letter; tileLength: number } | undefined> =
		useSharedValue(undefined);

	useDerivedValue(() => {
		if (tilePicked && tilePicked.value) {
			letter.value = tilePicked.value.letter;
			tileLength.value = tilePicked.value.tileLength;
		}
	});

	// const getIndicesFromBoard = (rowIndex: number, colIndex: number) => {
	// 	setRowIndex(rowIndex);
	// 	setColIndex(colIndex);
	// };

	// const getCoordinates = (coordX: number, coordY: number) => {
	// 	coordinateX.value = coordX;
	// 	coordinateY.value = coordY;
	// };

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Board
				size={5}
				isTileDragging={tileIsDragging}
				tileDimensions={tileDimensions}
				droppedTile={tileDropped}
				pickTileFunc={pickTileFunc}
				// indices={getIndicesFromBoard}
				// getCoordinates={getCoordinates}
			/>

			{/* <Rack tileDrag={tileIsDragging} tileDimensions={tileDimensions} /> */}

			{!hasDropped && pickedT}
		</View>
	);
};

export default DragAndDropTileTest;
