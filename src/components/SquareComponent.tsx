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
import Tile, { letter } from "./TileComponent";

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
	coordinateX: number;
	coordinateY: number;
	tile3?: SharedValue<{ letter: letter; tileLength: number } | undefined>;
	tile2?: SharedValue<JSX.Element | undefined>;
	tile?: JSX.Element;
	style?: StyleProp<ViewStyle>;
	bgColor?: ColorValue;
	bgStyle?: AnimateStyle<ViewStyle>;
	spitLayout?: Function;
};

export default function Square({
	length,
	type,
	coordinateX,
	coordinateY,
	tile,
	tile2,
	tile3,
	style,
	bgColor,
	bgStyle,
	spitLayout,
}: SquareProps): JSX.Element {
	const [_length, setLength] = React.useState(length ?? 0);
	const [_type, setType] = React.useState(type ?? SquareType.NONE);
	const [coordinates, setCoordinates] = React.useState(
		{
			x: coordinateX,
			y: coordinateY,
		} ?? {
			x: 0,
			y: 0,
		}
	);
	const [isOccupied, setOccupied] = React.useState(tile3 && tile3.value ? true : false);

	const [tileSV, setTileSV] = React.useState(tile3?.value);

	useDerivedValue(() => {
		if (tile3 && tile3.value) {
			console.log("Tile3: " + JSON.stringify(tile3.value));
			runOnJS(setTileSV)(tile3.value);
		} else {
			runOnJS(setTileSV)(undefined);
		}
	});

	return (
		<>
			<Animated.View
				style={[
					{
						height: length,
						width: length,
						backgroundColor: bgColor,
					},
					bgStyle,
				]}
				onLayout={(event) => (spitLayout ? spitLayout(event.nativeEvent.layout) : {})}>
				<InsetShadow
					shadowColor="#000"
					shadowOpacity={1}
					elevation={5}
					right={isOccupied ? true : false}
					bottom={isOccupied ? true : false}
					containerStyle={{}}>
					<View style={[style]}>
						{tileSV && <Tile tileLength={tileSV.tileLength} letter={tileSV.letter} />}
					</View>
				</InsetShadow>
			</Animated.View>
		</>
	);
}
