import { View, Text, LayoutRectangle } from "react-native";
import React from "react";
import {
	GestureStateChangeEvent,
	PanGestureHandlerEventPayload,
	GestureUpdateEvent,
	PanGestureChangeEventPayload,
} from "react-native-gesture-handler";
import DragAndDrop from "../../utils/DragAndDrop";
import Tile, { ShadowTile, TileProps } from "../components/TileComponent";
import { useSharedValue } from "react-native-reanimated";

type TileType = "normal" | "shadow";

type DragAndDropTileProps = {
	tileType?: TileType;
	tileDragStarted?: Function;
	tileDragging?: Function;
	tileDragEnded?: Function;
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
}: DragAndDropTileProps & TileProps): JSX.Element => {
	const tileDimensions = {
		x0: 0,
		y0: 0,
		width: 0,
		height: 0,
	};

	React.useEffect(() => {
		console.log("Rendering DADTile");
	});
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

	const tileOffset = (tileLayout: LayoutRectangle) => {
		tileDimensions.height = tileLayout.height;
		tileDimensions.width = tileLayout.width;
		tileDimensions.x0 = tileLayout.x;
		tileDimensions.y0 = tileLayout.y;

		console.log(JSON.stringify(tileDimensions));
	};
	return (
		<DragAndDrop
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
				tileDragging ? tileDragging(event) : {};
			}}
			onDrop={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
				console.log("Dropped at:", event.absoluteX, event.absoluteY);
				console.log("Tile absolute coord:", tileAbsoluteX, tileAbsoluteY);
				tileDragEnded ? tileDragEnded() : {};
			}}
			onLayout={(event) => {
				tileAbsoluteX = event.nativeEvent.layout.x;
				console.log("TAX:", tileAbsoluteX);
				tileAbsoluteY = event.nativeEvent.layout.y;
				console.log("TAY:", tileAbsoluteY);
			}}
			style={{ margin: 30, backgroundColor: "#f00" }}>
			{type === "normal" ? (
				<Tile letter={letter} tileLength={tileLength} onLayout={tileOffset} />
			) : (
				<ShadowTile letter={letter} tileLength={tileLength} onLayout={tileOffset} />
			)}
		</DragAndDrop>
	);
};

export default DragAndDropTile;
