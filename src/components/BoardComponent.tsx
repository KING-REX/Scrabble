import React from "react";
import { LayoutRectangle, StyleSheet, TextProps, View, ViewProps, ViewStyle } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolateColor,
	AnimateStyle,
	useDerivedValue,
	SharedValue,
} from "react-native-reanimated";
import { ColorValue } from "react-native";
import Square from "./SquareComponent";
// import Board from '../objects/board/Board';
// import SquareComponent from "./SquareComponent";
// import Square from "../objects/square/Square";

// type BoardComponentProps = {
//     board?: Board,
//     length?: number,
// }

type BoardProps = {
	size?: number;
	isTileDragging?: boolean;
	isTD?: SharedValue<boolean>;
	animated?: AnimateStyle<ViewStyle>;
	// animatedProps?: Partial<{
	// 	tileIsDragging: boolean;
	// }>;
};

const rowHeight = 50;
const colHeight = rowHeight;
const rowGap = 4;
const colGap = rowGap;

export default function Board({ size, isTD, isTileDragging, animated }: BoardProps): JSX.Element {
	const newITD = useSharedValue(false);

	// const itdValue = newITD.value ? "#000" : "#AAA";

	// const itdValue = useDerivedValue(() => {
	// 	if (!isTD) console.log("There is no isTD");
	// 	newITD.value = isTD ? (isTD.value ? isTD.value : false) : false;
	// 	console.log("NewITD has changed !!!", newITD.value);

	// 	return newITD.value ? "#000" : "#AAA";
	// });

	const backgroundColor = useSharedValue("#FFF");

	let boardOffsetX: number = 0;
	let boardOffsetY: number = 0;
	let boardHeight: number = 0;
	let boardWidth: number = 0;

	let currentRowOffsetX: number = 0;
	let currentRowOffsetY: number = 0;

	let tileOffsetX: number = 0;
	let tileOffsetY: number = 0;
	let tileAbsoluteX: number = 0;
	let tileAbsoluteY: number = 0;

	const rowIndex = useSharedValue(-1);
	const colIndex = useSharedValue(-1);

	const boardOffset = (boardLayout: LayoutRectangle) => {
		boardOffsetX = boardLayout.x;
		boardOffsetY = boardLayout.y;
		console.log("Board offset:", boardOffsetX, boardOffsetY);
		boardWidth = boardLayout.height;
		boardWidth = boardLayout.width;
	};

	const currentRowOffset = (rowLayout: LayoutRectangle) => {
		currentRowOffsetX = rowLayout.x;
		currentRowOffsetY = rowLayout.y;
	};

	const tileOffset = (tileLayout: LayoutRectangle) => {
		// tileOffsetX = tileLayout.x;
		// tileOffsetY = tileLayout.y;
		// console.log("Tile offset: " + tileLayout.x);
	};

	const spitOutLayoutParams = (layout: LayoutRectangle) => {
		// console.log("Gotcha... X: ", layout.x);
	};

	const yToRowIndex = (y: number) => {};

	const BOARD_SIZE: number = size ?? 5;

	const rows = [...Array(BOARD_SIZE)].map((_, i) => i);
	const cells = [...Array(BOARD_SIZE)].map((_, i) => i);

	const squareBgStyle = (i: number, j: number) =>
		useAnimatedStyle(() => {
			const backgroundColor = interpolateColor(
				rowIndex.value,
				[-1, 0, 1, 2, 3, 4],
				["#fff", "#0f0", "#f0f", "#ff0", "#00f", "#AAA"]
			);

			// console.log("In squareBgStyle, i is", i);

			if (rowIndex.value === i && colIndex.value === j) return { backgroundColor };
			else return { backgroundColor: "#FFF" };
		}, [rowIndex.value]);

	return (
		<Animated.View
			style={[
				styles.board,
				{
					// backgroundColor: useDerivedValue(() => {
					// 	return isTD?.value ? "#000" : "#AAA";
					// }).value,
				},

				// animated,
			]}
			onLayout={(event) => boardOffset(event.nativeEvent.layout)}>
			{rows.map((_, i) => {
				return (
					<Animated.View
						key={i}
						style={[styles.row, {}]}
						onLayout={(event) => currentRowOffset(event.nativeEvent.layout)}>
						{cells.map((_, j) => {
							return (
								<Square
									spitLayout={spitOutLayoutParams}
									key={j}
									coordinateX={i}
									coordinateY={j}
									length={rowHeight}
									style={styles.cell}
									bgStyle={squareBgStyle(i, j)}
								/>
							);
						})}
					</Animated.View>
				);
			})}
		</Animated.View>
	);
}

// export default function Board(): JSX.Element {
//   const board: any[] = [...Array(15)].map((_, i) => i);
//   const row: any[] = [...Array(15)].map((_, i) => i);
//   return (
//     <View style={styles.board}>
//       {board.map((boardRow, rowIndex) => {
//         return (
//           <View key={rowIndex} style={styles.row}>
//             {row.map((boardCell, cellIndex) => {
//               return (
//                 <SquareComponent
//                   coordinateX={rowIndex}
//                   coordinateY={cellIndex}
//                   length={23}
//                   style={styles.cell}
//                 />
//               );
//             })}
//           </View>
//         );
//       })}
//     </View>
//   );
// }

// export default function BoardComponent({ board, length }: BoardComponentProps): JSX.Element {

//     const [_board, set_Board] = React.useState(board ?? new Board());

//     return (
//         <View style={styles.board}>
//             {
//                 _board.getSquares().map((row, rowIndex) => {
//                     return (
//                         <View key={rowIndex} style={styles.row}>
//                             {
//                                 row.map((cell, cellIndex) => {
//                                     return (
//                                         <SquareComponent
//                                             key={cellIndex}
//                                             square={cell}
//                                             bgColor={'#fff'}
//                                         // style={styles.cell}
//                                         // length={length}
//                                         ></SquareComponent>
//                                     )
//                                 })
//                             }
//                         </View>
//                     )
//                 })
//             }
//         </View>
//     )
// }

const styles = StyleSheet.create({
	board: {
		// width: "100%",
		gap: rowGap,
		padding: 4,
		backgroundColor: "#fff",
	},
	row: {
		// width: "100%",
		columnGap: colGap,
		flexDirection: "row",
		gap: 1,
	},
	cell: {
		flex: 1,
		// zIndex: 10,
	},
});
