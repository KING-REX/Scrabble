import React from "react";
import { LayoutRectangle, StyleSheet, TextProps, View, ViewProps, ViewStyle } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolateColor,
	AnimateStyle,
	useDerivedValue,
	SharedValue,
	runOnJS,
} from "react-native-reanimated";
import Square from "./SquareComponent";
import Tile, { letter } from "./TileComponent";
import DragAndDropTile from "../tests/DragAndDropTile";
import InsetShadow from "react-native-inset-shadow";
import {
	BOARD_HEIGHT,
	BOARD_LENGTH,
	INVALID,
	MIDDLE_HEIGHT,
	MID_BOARD,
	SIZE,
	boardOffsetX,
	boardOffsetY,
	gap,
	grossSize,
	// setBoardOffsetX,
	// setBoardOffsetY,
} from "../helpers/Notation";
import { Neomorph, Shadow } from "react-native-neomorph-shadows";
// import { initBoardOffsets } from "../helpers/BoardParams";
// import Board from '../objects/board/Board';
// import SquareComponent from "./SquareComponent";
// import Square from "../objects/square/Square";

// type BoardComponentProps = {
//     board?: Board,
//     length?: number,
// }

type BoardProps = {
	size?: number;
	isTileDragging?: SharedValue<boolean>;
	tileDimensions?: SharedValue<
		{ x: number; y: number; width: number; height: number } | undefined
	>;
	droppedTile?: SharedValue<
		{ letter: letter; tileLength: number; tileX: number; tileY: number } | undefined
	>;
	pickTileFunc?: Function;
	indices?: (rowIndex: number, colIndex: number) => void;
	getCoordinates?: (coordinateX: number, coordinateY: number) => void;
	style?: AnimateStyle<ViewStyle>;
};

// export const getBoardOffsets;

export default function Board({
	size,
	tileDimensions,
	isTileDragging,
	droppedTile,
	pickTileFunc,
	indices,
	getCoordinates,
	style,
}: BoardProps): JSX.Element {
	// const [boardOffsetX, setBoardOffsetX] = React.useState(-1);
	// const [boardOffsetY, setBoardOffsetY] = React.useState(-1);
	// const [boardHeight, setBoardHeight] = React.useState(-1);
	// const [boardWidth, setBoardWidth] = React.useState(-1);
	const [board, setBoard] = React.useState(null);

	// const boardOffset = ({ x, y, height, width }: LayoutRectangle) => {
	// 	setBoardOffsetX(x);
	// 	setBoardOffsetY(y);
	// 	setBoardHeight(height);
	// 	setBoardWidth(width);

	// 	console.log("Board offset X&Y:", x, y);
	// };

	const getBoardOffset = () => {
		return;
	};

	const rowIndex = useSharedValue(-1);
	const colIndex = useSharedValue(-1);

	let tileOffsetX: number = 0;
	let tileOffsetY: number = 0;
	let tileAbsoluteX: number = 0;
	let tileAbsoluteY: number = 0;

	// const BOARD_LENGTH: number = size ?? 15;

	useDerivedValue(() => {
		if (isTileDragging && tileDimensions && tileDimensions.value) {
			// console.log("Tile Dimensions changed to:", JSON.stringify(tileDimensions.value));
			// console.log("BoardOffsetX: " + boardOffsetX);
			tileAbsoluteX = tileDimensions.value.x;
			tileAbsoluteY = tileDimensions.value.y;
			// console.log("TileAbsoluteX:", tileAbsoluteX);
			let roundedX: number = Math.round((tileAbsoluteX - boardOffsetX) / (SIZE + gap));
			let roundedY: number = Math.round((tileAbsoluteY - boardOffsetY) / (SIZE + gap));

			rowIndex.value = roundedY === -0 ? 0 : roundedY < BOARD_LENGTH ? roundedY : -1;
			colIndex.value = roundedX === -0 ? 0 : roundedX < BOARD_LENGTH ? roundedX : -1;

			// console.log("RoundedX:", roundedX);
			// console.log("RoundedY:", roundedY);

			// console.log("Col Index:", colIndex.value);
			// console.log("Row Index:", rowIndex.value);
			// console.log();
		} else {
			// console.log(
			// 	"Dropped tile noticed in BoardComponent:",
			// 	droppedTile?.value?.letter,
			// 	droppedTile?.value?.tileLength
			// );
		}
	});

	let currentRowOffsetX: number = 0;
	let currentRowOffsetY: number = 0;

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

	// const checkForDroppedTile = (i: number, j: number) =>
	// 	useDerivedValue(() => {
	// 		if (droppedTile && droppedTile.value) {
	// 			if (rowIndex.value === i && colIndex.value === j) {
	// 				console.log("Dropped on square " + i, j);
	// 				return (
	// 					<Tile
	// 						letter={droppedTile.value.letter}
	// 						tileLength={droppedTile.value.tileLength}
	// 					/>
	// 				);
	// 			}
	// 		}
	// 		return undefined;
	// 	});

	const rows = [...Array(BOARD_LENGTH)].map((_, i) => i);
	const cells = [...Array(BOARD_LENGTH)].map((_, i) => i);

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

	const getDroppedTile = (i: number, j: number) =>
		useDerivedValue(() => {
			if (rowIndex.value === i && colIndex.value === j) {
				indices ? runOnJS(indices)(i, j) : {};
				if (droppedTile && droppedTile.value) return droppedTile.value;
				else return undefined;
			}
		});

	const pickTile = (tile: {
		letter: letter;
		tileLength: number;
		tileX: number;
		tileY: number;
	}) => {
		// console.log(
		// 	"Tile details:",
		// 	JSON.stringify({
		// 		...tile,
		// 		tileX: tile.tileX + boardOffsetX,
		// 		tileY: tile.tileY + boardOffsetY,
		// 	})
		// );
		tile && pickTileFunc
			? pickTileFunc({
					...tile,
					tileX: tile.tileX + boardOffsetX,
					tileY: tile.tileY + boardOffsetY,
			  })
			: {};
	};

	return (
		<Animated.View
			style={[
				styles.board,
				style,
				{
					// backgroundColor: useDerivedValue(() => {
					// 	return isTileDragging?.value ? "#000" : "#AAA";
					// }).value,
				},

				// animated,
			]}
			onLayout={(event) => {
				// boardOffset(event.nativeEvent.layout);
				// initBoardOffsets(event.nativeEvent.layout.x, event.nativeEvent.layout.y);
				// setBoardOffsetX(event.nativeEvent.layout.x);
				// setBoardOffsetY(event.nativeEvent.layout.y);
				console.log(
					"Board offsets from Board:",
					event.nativeEvent.layout.x,
					event.nativeEvent.layout.y
				);
				console.log();
			}}>
			{rows.map((_, i) => {
				return (
					<Animated.View
						key={i}
						style={[styles.row, {}]}
						onLayout={(event) => currentRowOffset(event.nativeEvent.layout)}>
						{cells.map((_, j) => {
							//prettier-ignore
							let coordinateX = (j * SIZE) + ((j + 1) * gap);
							//prettier-ignore
							let coordinateY = (i * SIZE) + ((i + 1) * gap);

							// useDerivedValue(() => {
							// 	if (rowIndex.value === i && colIndex.value === j) {
							// 		getCoordinates
							// 			? runOnJS(getCoordinates)(
							// 					coordinateX + boardOffsetX,
							// 					coordinateY + boardOffsetY
							// 			  )
							// 			: {};
							// 	}
							// });

							return (
								<Shadow
									key={j}
									inner
									useArt
									style={{
										height: SIZE,
										width: SIZE,
										backgroundColor: "#ddd",
										shadowColor: "#000",
										shadowOpacity: 1,
										shadowRadius: 3,
										borderRadius: 2,
									}}>
									<View></View>
								</Shadow>
								// <Square
								// 	spitLayout={spitOutLayoutParams}
								// 	key={j}
								// 	rowIndex={i}
								// 	colIndex={j}
								// 	// prettier-ignore
								// 	coordinateX={coordinateX}
								// 	// prettier-ignore
								// 	coordinateY={coordinateY}
								// 	length={SIZE}
								// 	style={styles.cell}
								// 	bgStyle={squareBgStyle(i, j)}
								// 	// tile={
								// 	// 	droppedTile &&
								// 	// 	droppedTile.value && (
								// 	// 		<Tile
								// 	// 			letter={droppedTile.value.letter}
								// 	// 			tileLength={droppedTile.value.tileLength}
								// 	// 		/>
								// 	// 	)
								// 	// }
								// 	// tile2={tileSV}
								// 	tileSharedValue={getDroppedTile(i, j)}
								// 	pickTile={pickTile}
								// />
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
		gap: gap,
		padding: gap,
		backgroundColor: "#fff",
	},
	row: {
		// width: "100%",
		columnGap: gap,
		flexDirection: "row",
		// gap: gap,
	},
	cell: {
		// flex: 1,
		// zIndex: 10,
	},
});
