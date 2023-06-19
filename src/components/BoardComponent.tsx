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
import Square from "./SquareComponent";
import Tile, { letter } from "./TileComponent";
import DragAndDropTile from "../tests/DragAndDropTile";
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
	style?: AnimateStyle<ViewStyle>;
};

const rowHeight = 50;
const colHeight = rowHeight;
const rowGap = 4;
const colGap = rowGap;

export default function Board({
	size,
	tileDimensions,
	isTileDragging,
	droppedTile,
	pickTileFunc,
	style,
}: BoardProps): JSX.Element {
	const tileSV = useSharedValue(
		droppedTile && droppedTile.value && (
			<Tile tileLength={droppedTile.value.tileLength} letter={droppedTile.value.letter} />
		)
	);

	const [boardOffsetX, setBoardOffsetX] = React.useState(-1);
	const [boardOffsetY, setBoardOffsetY] = React.useState(-1);
	const [boardHeight, setBoardHeight] = React.useState(-1);
	const [boardWidth, setBoardWidth] = React.useState(-1);

	const boardOffset = (boardLayout: LayoutRectangle) => {
		setBoardOffsetX(boardLayout.x);
		setBoardOffsetY(boardLayout.y);
		setBoardHeight(boardLayout.height);
		setBoardWidth(boardLayout.width);
		console.log("Board offset X&Y:", boardLayout.x, boardLayout.y);
	};

	const rowIndex = useSharedValue(-1);
	const colIndex = useSharedValue(-1);

	let tileOffsetX: number = 0;
	let tileOffsetY: number = 0;
	let tileAbsoluteX: number = 0;
	let tileAbsoluteY: number = 0;

	const BOARD_SIZE: number = size ?? 5;

	useDerivedValue(() => {
		if (isTileDragging && tileDimensions && tileDimensions.value) {
			// console.log("Tile Dimensions changed to:", JSON.stringify(tileDimensions.value));
			// console.log("BoardOffsetX: " + boardOffsetX);
			tileAbsoluteX = tileDimensions.value.x;
			tileAbsoluteY = tileDimensions.value.y;
			// console.log("TileAbsoluteX:", tileAbsoluteX);
			let roundedX: number = Math.round(
				(tileAbsoluteX - boardOffsetX) / (colHeight + colGap)
			);
			let roundedY: number = Math.round(
				(tileAbsoluteY - boardOffsetY) / (rowHeight + rowGap)
			);

			rowIndex.value = roundedY === -0 ? 0 : roundedY < BOARD_SIZE ? roundedY : -1;
			colIndex.value = roundedX === -0 ? 0 : roundedX < BOARD_SIZE ? roundedX : -1;

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

	const getDroppedTile = (i: number, j: number) =>
		useDerivedValue(() => {
			if (rowIndex.value === i && colIndex.value === j && droppedTile && droppedTile.value)
				return droppedTile.value;
			else return undefined;
		});

	const pickTile = (tile: {
		letter: letter;
		tileLength: number;
		tileX: number;
		tileY: number;
	}) => {
		console.log(
			"Tile details:",
			JSON.stringify({
				...tile,
				tileX: tile.tileX + boardOffsetX,
				tileY: tile.tileY + boardOffsetY,
			})
		);
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
				boardOffset(event.nativeEvent.layout);
			}}>
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
									rowIndex={i}
									colIndex={j}
									// prettier-ignore
									coordinateX={(j * colHeight) + ((j + 1) * colGap)}
									// prettier-ignore
									coordinateY={(i * rowHeight) + ((i + 1) * rowGap)}
									length={rowHeight}
									style={styles.cell}
									bgStyle={squareBgStyle(i, j)}
									// tile={
									// 	droppedTile &&
									// 	droppedTile.value && (
									// 		<Tile
									// 			letter={droppedTile.value.letter}
									// 			tileLength={droppedTile.value.tileLength}
									// 		/>
									// 	)
									// }
									// tile2={tileSV}
									tileSharedValue={getDroppedTile(i, j)}
									pickTile={pickTile}
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
		// flex: 1,
		// zIndex: 10,
	},
});
