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
import Board from "../components/BoardComponent";
import DragAndDropTile from "./DragAndDropTile";
import RefurbishedTile from "../components/RefurbishedTile";
import { MIDDLE_HEIGHT, MID_BOARD, SIZE, boardOffsetY } from "../helpers/Notation";
import Rack from "../components/Rack";

const rowHeight = 23;
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
	// const [hasDropped, setHasDropped] = React.useState(false);
	// const [hasPicked, setHasPicked] = React.useState(false);

	// const [rowIndex, setRowIndex] = React.useState(-1);
	// const [colIndex, setColIndex] = React.useState(-1);

	// const [coordinateX, setCoordinateX] = React.useState(-1);
	// const [coordinateY, setCoordinateY] = React.useState(-1);

	const coordinateX = useSharedValue(-1);
	const coordinateY = useSharedValue(-1);

	const translationX = useSharedValue(0);
	const translationY = useSharedValue(0);

	const letter: SharedValue<letter> = useSharedValue("H");
	const tileLength: SharedValue<number> = useSharedValue(23);

	const tileOffset = useSharedValue<{ x: number; y: number }>({
		x: -1,
		y: -1,
	});

	// const [tileOffset, setTileOffset] = React.useState({
	// 	x: -1,
	// 	y: -1,
	// });

	const content = (
		tile?: ContentProps,
		style?: ViewStyle,
		animatedStyle?: AnimateStyle<ViewStyle>
	): JSX.Element => {
		return (
			<DragAndDropTile
				//prettier-ignore
				letter={(tile && tile.letter) ? tile.letter : letter.value}
				//prettier-ignore
				tileLength={(tile && tile.tileLength) ? tile.tileLength : tileLength.value}
				tileType="shadow"
				tileDragStarted={(
					event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
				) => {
					tileIsDragging.value = true;
					tileDropped.value = undefined;
					// setHasDropped(false);
				}}
				tileDragging={(
					event: GestureUpdateEvent<
						PanGestureHandlerEventPayload & PanGestureChangeEventPayload
					>,
					tileDim: { x0: number; y0: number; width: number; height: number },
					translationObj: { x: SharedValue<number>; y: SharedValue<number> }
				) => {
					if (!(tileOffset.value.x > -1 && tileOffset.value.y > -1)) {
						tileOffset.value = {
							x: event.absoluteX - tileDim.x0,
							y: event.absoluteY - tileDim.y0,
						};
						// setTileOffset({
						// 	x: event.absoluteX - tileDim.x0,
						// 	y: event.absoluteY - tileDim.y0,
						// });
					}
					// console.log("Event vs TileDim X:", event.absoluteX, tileDim.x0, tileOffset.x);
					// console.log("Event vs TileDim Y:", event.absoluteY, tileDim.y0, tileOffset.y);

					tileDimensions.value = {
						x: tileDim.x0,
						y: tileDim.y0,
						width: tileDim.width,
						height: tileDim.height,
					};

					translationX.value = translationObj.x.value;
					translationY.value = translationObj.y.value;
				}}
				tileDragEnded={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
					tileIsDragging.value = false;
					tileDropped.value = {
						//prettier-ignore
						// letter: (tile && tile.letter) ? tile.letter : letter.value,
						letter: letter.value,
						//prettier-ignore
						// tileLength: (tile && tile.tileLength) ? tile.tileLength : tileLength.value,
						tileLength: tileLength.value,
						//prettier-ignore
						// tileX: (tile && tile.tileX) ? tile.tileX : tileDimensions.value!.x,
						tileX: tileDimensions.value!.x,
						//prettier-ignore
						// tileY: (tile && tile.tileY) ? tile.tileY : tileDimensions.value!.y,
						tileY: tileDimensions.value!.y,
					};
					tileDimensions.value = undefined;
					// setHasDropped(true);
				}}
				style={style}
				animatedStyle={animatedStyle}
			/>
		);
	};

	// const [pickedT, setPickedT] = React.useState<JSX.Element | undefined>(
	// 	content(undefined, { position: "absolute", bottom: 100 })
	// );

	const pickTileFunc = (tile: {
		letter: letter;
		tileLength: number;
		tileX: number;
		tileY: number;
	}) => {
		// 	console.log("Picked TileX&Y:", tile.tileX, tile.tileY);
		// 	setPickedT(
		// 		content(tile, {
		// 			position: "absolute",
		// 			top: tile.tileY,
		// 			left: tile.tileX,
		// })
		// );
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

	const getIndicesFromBoard = (rowIndex: number, colIndex: number) => {
		// setRowIndex(rowIndex);
		// setColIndex(colIndex);
	};

	const getCoordinates = (coordX: number, coordY: number) => {
		coordinateX.value = coordX;
		coordinateY.value = coordY;
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Board
			// isTileDragging={tileIsDragging}
			// tileDimensions={tileDimensions}
			// droppedTile={tileDropped}
			// pickTileFunc={pickTileFunc}
			// indices={getIndicesFromBoard}
			// getCoordinates={getCoordinates}
			/>

			{/* {!hasDropped && pickedT} */}

			{/* {content(
				undefined,
				// { marginTop: 30 },
				useAnimatedStyle(() => {
					if (tileDropped && tileDropped.value) {
						// console.log("TIleDropped: " + JSON.stringify(tileDropped.value));
						// console.log("Indices after dropping tile:", rowIndex, colIndex);
						// console.log(
						// 	"Tile coordinates from droppedTile:",
						// 	tileDropped.value.tileX,
						// 	tileDropped.value.tileY
						// );
						// console.log(
						// 	"Coordinates from dropped tile's square:",
						// 	coordinateX.value,
						// 	coordinateY.value
						// );
						// console.log(
						// 	"Translating to:",
						// 	coordinateX.value - tileDropped.value.tileX,
						// 	coordinateY.value - tileDropped.value.tileY
						// );

						return {
							transform: [
								{
									translateX:
										translationX.value +
										coordinateX.value -
										tileDropped.value.tileX,
								},
								{
									translateY:
										translationY.value +
										coordinateY.value -
										tileDropped.value.tileY,
								},
							],

							// position: "absolute",
							// top: coordinateY.value - tileDropped.value.tileY + tileOffset.y,
							// left: coordinateX.value - tileDropped.value.tileX + tileOffset.x,

							//THIS IS ASSIGNING THE TOUCH'S COORDINATES NOT THE TILE'S COORDINATES, TO THE 0,0 OF THE SQUARE. SO YOU'LL NEED TO GET THE TILE OFFSET WHILE PASSING TILE INFO!
						};
					} else {
						return {};
					}
				})
			)} */}

			{/* <RefurbishedTile
				letter="H"
				tileLength={SIZE}
				initialOffset={{
					offsetX: { from: "left", value: 60 },
					offsetY: { from: "bottom", value: 50 },
				}}
			/>
			<RefurbishedTile
				letter="H"
				tileLength={SIZE}
				initialOffset={{
					offsetX: { from: "left", value: 120 },
					offsetY: { from: "bottom", value: 50 },
				}}
			/> */}

			<Rack />

			{/* <Animated.View
				style={useAnimatedStyle(() => {
					return {
						position: "absolute",
						width: 5,
						height: 5,
						backgroundColor: "#F00F00",
						borderRadius: 5,
						top: coordinateY.value,
						left: coordinateX.value,
					};
				})}></Animated.View> */}
		</View>
	);
};

export default DragAndDropTileTest;
