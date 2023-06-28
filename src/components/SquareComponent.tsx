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
	pickTile: (tile: { letter: letter; tileLength: number; tileX: number; tileY: number }) => void;
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

	const tileSV = useSharedValue<
		| {
				letter: letter;
				tileLength: number;
				tileX: number;
				tileY: number;
		  }
		| undefined
	>(undefined);

	// React.useEffect(() => {
	// 	console.log("IsLocked changed to:", isLocked);
	// }, [isLocked]);

	React.useEffect(() => {
		if (tileSharedValue && tileSharedValue.value) {
			// console.log("There's a tileSharedValue... ");
			// console.log("Tile3: " + JSON.stringify(tile3.value));
			tileSV.value = tileSharedValue.value;
			// runOnJS(setOccupied)(true);
			// runOnJS(setLocked)(true);
		} else {
			// console.log("There's no tileSharedValue... ");
			tileSV.value = undefined;
			// runOnJS(setOccupied)(false);
			runOnJS(setLocked)(false);
		}
	});

	// React.useEffect(() => {
	// 	console.log("Tile is", isLocked ? "locked!" : "notLocked!");
	// }, [isLocked]);

	useDerivedValue(() => {
		// prettier-ignore
		runOnJS(setOccupied)((tileSV && tileSV.value) ? true : false);
		// console.log("Occupied:", isOccupied);
	});

	useDerivedValue(() => {
		if (!isLocked && tileSV && tileSV.value) {
			const tile = {
				letter: tileSV.value.letter,
				tileLength: tileSV.value.tileLength,
				tileX: coordinateX,
				tileY: coordinateY,
			};
			// console.log("Picking Tile!!!!");
			pickTile ? runOnJS(pickTile)(tile) : {};
			// runOnJS(setOccupied)(false);
			tileSV.value = undefined;

			// console.log("There's a tileSharedValue...");
			console.log("Tile from inside the square component:", JSON.stringify(tile));
		}
		// else console.log("There's no tileSharedValue...");
	});

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
					{
						//prettier-ignore
						(tileSV && tileSV.value && isLocked) ? (
						<DragAndDropTile
							onLayout={() => {
								console.log("Dropped tile layout on square!!!");
							}}
							letter={tileSV.value.letter}
							tileLength={tileSV.value.tileLength}
							tileType="shadow"
							enableDrag={false}
							style={{ zIndex: 30 }}
							tileDragStarted={() => {}}
							tileLongPressStarted={({
								event,
							}: {
								event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>;
								tileX: number;
								tileY: number;
							}) => {}}
						/>
					) : (
						// tileElement
						<></>
					)
					}
				</Animated.View>
			</InsetShadow>
		</Animated.View>
	);
}
