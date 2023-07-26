import React from "react";
import { LayoutRectangle, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { BOARD_LENGTH, SIZE, gap } from "../helpers/Notation";
import { Shadow } from "react-native-neomorph-shadows";
import SquareComponent from "./SquareComponent";
import { getSquareType } from "../helpers/SquareType";

export default function Board(): JSX.Element {
	const rows = [...Array(BOARD_LENGTH)].map((_, i) => i);
	const cells = [...Array(BOARD_LENGTH)].map((_, i) => i);

	return (
		<View style={styles.board}>
			{rows.map((_, i) => {
				return (
					<View key={i} style={styles.row}>
						{cells.map((_, j) => {
							return (
								// <Shadow
								// 	key={j}
								// 	inner
								// 	useArt
								// 	style={{
								// 		height: SIZE,
								// 		width: SIZE,
								// 		backgroundColor: "#ddd",
								// 		shadowColor: "#000",
								// 		shadowOpacity: 1,
								// 		shadowRadius: 3,
								// 		borderRadius: 2,
								// 	}}>
								// </Shadow>
								<SquareComponent
									key={`${i}${j}`}
									rowIndex={i}
									colIndex={j}
									type={getSquareType(i, j)}
								/>
							);
						})}
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	board: {
		gap: gap,
		padding: gap,
		backgroundColor: "#fff",
	},
	row: {
		columnGap: gap,
		flexDirection: "row",
	},
});
