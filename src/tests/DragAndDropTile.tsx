import { View, Text, LayoutRectangle, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import {
	GestureStateChangeEvent,
	PanGestureHandlerEventPayload,
	GestureUpdateEvent,
	PanGestureChangeEventPayload,
	LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import DragAndDrop from "../../utils/DragAndDrop";
import Tile, {
	InsetShadowTile,
	NeoShadowTile,
	ShadowTile,
	TileProps,
	letter,
} from "../components/TileComponent";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type TileType = "normal" | "shadow";

type DragAndDropTileProps = {
	tileType?: TileType;
	tileDragStarted?: Function;
	tileDragging?: Function;
	tileDragEnded?: Function;
	tileLongPressStarted?: Function;
	tileLongPressEnded?: Function;
	style?: ViewStyle;
	enableDrag?: boolean;
	tileDim?: Function;
};

type DragAndDropTileWithSVProps = {
	letterSV: SharedValue<letter>;
	tileLengthSV: SharedValue<number>;
};

const rowHeight = 50;
const colHeight = rowHeight;
const rowGap = 4;
const colGap = rowGap;

const DragAndDropTile = ({
	letter,
	tileLength,
	tileType,
	tileDragStarted,
	tileDragging,
	tileDragEnded,
	tileLongPressStarted,
	tileLongPressEnded,
	style,
	enableDrag,
	tileDim,
}: DragAndDropTileProps & TileProps): JSX.Element => {
	console.log("Prop enable drag is: " + enableDrag);
	// const [_enableDrag, setEnableDrag] = React.useState(enableDrag ?? true);
	// console.log("State enable drag is: " + _enableDrag);
	const tileDimensions = {
		x0: 0,
		y0: 0,
		width: 0,
		height: 0,
	};

	let type: TileType = tileType ?? "normal";

	let boardOffsetX: number = 0;
	let boardOffsetY: number = 0;

	let tileOffsetX: number = 0;
	let tileOffsetY: number = 0;
	let tileAbsoluteX: number = 0;
	let tileAbsoluteY: number = 0;

	const rowIndex = useSharedValue(-1);
	const colIndex = useSharedValue(-1);

	const BOARD_SIZE: number = 5;

	const initialTileOffset = (tileLayout: LayoutRectangle) => {
		tileDimensions.height = tileLayout.height;
		tileDimensions.width = tileLayout.width;
		tileDimensions.x0 = tileLayout.x;
		tileDimensions.y0 = tileLayout.y;

		console.log(JSON.stringify(tileDimensions));
	};

	const changedTileOffset = (tAbsoluteX: number, tAbsoluteY: number) => {
		tileDimensions.x0 = tAbsoluteX;
		tileDimensions.y0 = tAbsoluteY;
	};

	const contents = (): JSX.Element => {
		return type === "normal" ? (
			<Tile letter={letter} tileLength={tileLength} onLayout={initialTileOffset} />
		) : (
			<NeoShadowTile letter={letter} tileLength={tileLength} onLayout={initialTileOffset} />
		);
	};

	// React.useEffect(() => {
	// 	console.log("Enable drag has changed to: " + _enableDrag);
	// }, [_enableDrag]);

	/* 
					SO BASICALLY, THERE IS A PROBLEM WITH THE TILE DRAGGING. IF THE USER "THROWS" THE TILE, THE EVENT'S ABSOLUTE X AND Y CHANGES DRASTICALLY,
					AND THIS SHOULD BE THE REASON WHY THE CALCULATION FROM THE OFFSET GETS THROWN OFF...

					SO THE SOLUTION WILL BE TO REVERSE THE TILE TO IT'S INITIAL POSITION WHEN THE velocityX AND/OR the velocityY OF THE EVENT PASSES A CERTAIN 
					THRESHOLD. FIGURE OUT THAT THRESHOLD BY YOURSELF (RESEARCHING WILL BE A GOOD IDEA!)
				*/

	return (
		<DragAndDrop
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
				>
			) => {
				// console.log("Velocity[X&Y]:", event.velocityX, event.velocityY);
				// console.log(yToRowIndex(event.absoluteY))

				// console.log("Tile Absolute Y:", tileAbsoluteY);
				tileAbsoluteX = event.absoluteX - tileOffsetX;
				tileAbsoluteY = event.absoluteY - tileOffsetY;
				let roundedX: number = Math.round(
					(tileAbsoluteX - boardOffsetX) / (colHeight + colGap)
				);
				let roundedY: number = Math.round(
					(tileAbsoluteY - boardOffsetY) / (rowHeight + rowGap)
				);
				rowIndex.value = roundedY === -0 ? 0 : roundedY < BOARD_SIZE ? roundedY : -1;
				colIndex.value = roundedX === -0 ? 0 : roundedX < BOARD_SIZE ? roundedX : -1;

				// console.log("Round:", round);
				// console.log("Col Index:", colIndex.value);
				// console.log("Row Index:", rowIndex.value);

				changedTileOffset(tileAbsoluteX, tileAbsoluteY);

				tileDragging ? tileDragging(event, tileDimensions) : {};
			}}
			onDrop={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
				console.log("Dropped at:", event.absoluteX, event.absoluteY);
				console.log("Tile absolute coord:", tileAbsoluteX, tileAbsoluteY);
				tileDragEnded ? tileDragEnded() : {};
			}}
			onLongPressStarted={(
				event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>
			) => {
				console.log("Tile lp started at coord: " + tileAbsoluteX + ", " + tileAbsoluteY);
				tileLongPressStarted
					? tileLongPressStarted({ event, tileX: tileAbsoluteX, tileY: tileAbsoluteY })
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
			}}
			style={[style, { zIndex: 50 }]}>
			{contents()}
		</DragAndDrop>
	);
};

export const DragAndDropTileWithSV = ({
	letterSV,
	tileLengthSV,
	tileType,
	tileDragStarted,
	tileDragging,
	tileDragEnded,
	tileLongPressStarted,
	tileLongPressEnded,
	style,
	enableDrag,
}: DragAndDropTileWithSVProps & DragAndDropTileProps) => {};

export default DragAndDropTile;
