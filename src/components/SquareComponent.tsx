import React, { ReactElement } from "react";
import { ColorValue, Pressable, View, Text, StyleSheet } from "react-native";
import { StyleProp } from "../../node_modules/react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes";
import InsetShadow from "react-native-inset-shadow";
import useDeepCompareEffect from "use-deep-compare-effect";
import { NativeComponentType } from "react-native/Libraries/Utilities/codegenNativeComponent";
import Animated, {
	AnimateStyle,
	SharedValue,
	runOnJS,
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";
import Tile, { NeoShadowTile, letter } from "./TileComponent";
import DragAndDropTile from "../tests/DragAndDropTile";
import { Shadow } from "react-native-neomorph-shadows";
import DragAndDrop from "../../utils/DragAndDrop";
import {
	GestureStateChangeEvent,
	LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";

export enum SquareType {
	NONE,
	DOUBLE_LETTER,
	DOUBLE_WORD,
	TRIPLE_LETTER,
	TRIPLE_WORD,
}

type SquareComponentProps = {
	bgColor?: ColorValue;
	length: number;
	isOccupied: boolean;
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle> | undefined;
	// tile: Tile | null,
};

type SquareProps = {
	length: number;
	type?: SquareType;
	rowIndex: number;
	colIndex: number;
	coordinateX: number;
	coordinateY: number;
	tileElement?: JSX.Element;
	tileSharedValue?: SharedValue<
		{ letter: letter; tileLength: number; tileX: number; tileY: number } | undefined
	>;
	// tile2?: SharedValue<JSX.Element | undefined>;
	style?: StyleProp<ViewStyle>;
	bgColor?: ColorValue;
	bgStyle?: AnimateStyle<ViewStyle>;
	pickTile?: Function;
	spitLayout?: Function;
};

export default function Square({
	length,
	type,
	rowIndex,
	colIndex,
	coordinateX,
	coordinateY,
	// tile2,
	tileElement,
	tileSharedValue,
	style,
	bgColor,
	bgStyle,
	pickTile,
	spitLayout,
}: SquareProps): JSX.Element {
	const [_length, setLength] = React.useState(length ?? 0);
	const [_type, setType] = React.useState(type ?? SquareType.NONE);
	const indexOnBoard = React.useState(
		{
			x: rowIndex,
			y: colIndex,
		} ?? {
			x: 0,
			y: 0,
		}
	)[0];

	// console.log("IndexONBoard:", JSON.stringify(indexOnBoard));

	// console.log("Coord:", coordinateX, coordinateY);
	const [isOccupied, setOccupied] = React.useState(
		tileSharedValue && tileSharedValue.value ? true : false
	);
	const [isLocked, setLocked] = React.useState(false);
	const [tileValue, setTileSV] = React.useState(isOccupied ? tileSharedValue!.value : undefined);

	useDerivedValue(() => {
		if (tileSharedValue && tileSharedValue.value) {
			// console.log("Tile3: " + JSON.stringify(tile3.value));
			runOnJS(setTileSV)(tileSharedValue.value);
			runOnJS(setOccupied)(true);
			// runOnJS(setLocked)(true);
		} else {
			runOnJS(setTileSV)(undefined);
			runOnJS(setOccupied)(false);
			runOnJS(setLocked)(false);
		}
	});

	// React.useEffect(() => {
	// 	console.log("Tile is", isLocked ? "locked!" : "notLocked!");
	// }, [isLocked]);

	React.useEffect(() => {
		setOccupied(tileValue ? true : false);
	}, [tileValue]);

	function getTileCoord(label: string): number {
		if (label === "x".toLowerCase() || label === "x".toUpperCase()) {
			return coordinateX;
		} else if (label === "y".toLowerCase() || label === "y".toUpperCase()) {
			return coordinateY;
		}

		return -1;
	}

	return (
		<Animated.View
			style={[
				style,
				{
					height: length,
					width: length,
					backgroundColor: bgColor,
					zIndex: -10,
				},
				bgStyle,
			]}
			onLayout={(event) => (spitLayout ? spitLayout(event.nativeEvent.layout) : {})}>
			<InsetShadow
				shadowColor="#000"
				shadowOpacity={1}
				elevation={5}
				// right={isOccupied ? true : false}
				// bottom={isOccupied ? true : false}
				containerStyle={{ zIndex: -10 }}>
				<Animated.View>
					{tileValue ? (
						<DragAndDropTile
							letter={tileValue.letter}
							tileLength={tileValue.tileLength}
							tileType="shadow"
							enableDrag={false}
							style={{ zIndex: 30 }}
							tileDragStarted={() => {
								const tile = {
									letter: tileValue.letter,
									tileLength: tileValue.tileLength,
									tileX: getTileCoord("x"),
									tileY: getTileCoord("y"),
								};
								if (!isLocked) {
									console.log("Picking Tile!!!!");
									pickTile ? pickTile(tile) : {};
									setOccupied(false);
									setTileSV(undefined);
								}
								console.log(
									"Tile from inside the square component:",
									JSON.stringify(tile)
								);
							}}
							tileLongPressStarted={({
								event,
							}: {
								event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>;
								tileX: number;
								tileY: number;
							}) => {}}
						/>
					) : (
						tileElement
					)}
				</Animated.View>
			</InsetShadow>
		</Animated.View>
	);
}
