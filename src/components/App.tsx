/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BoardComponentTest from "../tests/BoardComponentTest";
// import DragAndDropTileTest from "../tests/DragAndDropTileTestWithDropAndPick";
import DragAndDropTileTest from "../tests/DragAndDropTileTestWithCoord";
import DraggableTileTest from "../tests/DraggableTileTest";
import FillOrEmptyBoardSquaresTest from "../tests/FillOrEmptyBoardSquaresTest";
import PutOrRemoveDraggableTileTest from "../tests/PutOrRemoveDraggableTileTest";
import PutOrRemoveTileTest from "../tests/PutOrRemoveTileTest";
import ScaleDraggableTileTest from "../tests/ScaleDraggableTileComponentTest";
import SquareTest from "../tests/SquareTest";
import ChessboardExample from "./DraggableTile";
import Test2 from "./Test2";
import React from "react";
import { StatusBar, View } from "react-native";
import { Word, BonusType, calculateRawScore, calculateDerivedScore } from "../engine/scrabble";
import DynamicTile from "./DynamicTile";

function App(): JSX.Element {
	const word: Word = [
		{ type: BonusType.MIDDLE_SQUARE, letter: "L" },
		{ type: BonusType.NONE, letter: "E" },
		{ type: BonusType.NONE, letter: "T" },
		{ type: BonusType.TRIPLE_WORD, letter: "T" },
		{ type: BonusType.NONE, letter: "E" },
		{ type: BonusType.NONE, letter: "R" },
		{ type: BonusType.DOUBLE_LETTER, letter: "S" },
	];

	console.log(`Raw score: ${calculateRawScore(word)}`);

	const randomStr = "1234rfs";

	console.log(`Derived score: ${calculateDerivedScore(word, true)}`);

	//This is just to test to see whether things are working out fine!
	//The gui alternative for console.log()...
	//This is not the main design !!!
	return (
		<>
			<StatusBar hidden />
			<GestureHandlerRootView style={{ backgroundColor: "#052a50", flex: 1 }}>
				<DragAndDropTileTest />
			</GestureHandlerRootView>
			{/* <DynamicTile letter={"G"} tileLength={20} /> */}
		</>
	);
}

/*********** CONTINUE THE MIGRATION FROM YOUR FAVOURITE, USE OF CLASSES (OOP) TO PURE FUNCTIONAL COMPONENTS/PROGRAMMING **************/

export default App;
