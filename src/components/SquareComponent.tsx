import React from "react";
import { ColorValue, Text } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SIZE } from "../helpers/Notation";
import { SquareType } from "../helpers/SquareType";

type SquareProps = {
	type: keyof typeof SquareType;
	rowIndex: number;
	colIndex: number;
	tileElement?: JSX.Element | (() => JSX.Element);
	style?: StyleProp<ViewStyle>;
	bgColor?: ColorValue;
};

export default function Square({
	type,
	rowIndex,
	colIndex,
	tileElement,
	style,
	bgColor,
}: SquareProps): JSX.Element {
	// const [isLocked, setLocked] = React.useState(false);

	const isLocked = useSharedValue<boolean>(false);

	return (
		<Animated.View
			style={[
				style,
				{
					justifyContent: "center",
					alignItems: "center",
					height: SIZE,
					width: SIZE,
					// backgroundColor: bgColor,
					backgroundColor: SquareType[type].color,
					borderRadius: 5,
					zIndex: -10,
				},
			]}>
			<Text
				style={{
					color: "#FFF",
					fontWeight: "500",
					fontSize: 12,
				}}>{`${SquareType[type].symbol}`}</Text>
			{typeof tileElement === "function" ? tileElement() : tileElement}
		</Animated.View>
	);
}
