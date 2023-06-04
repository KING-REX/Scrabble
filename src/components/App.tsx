/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BoardComponentTest from "../tests/BoardComponentTest";
import DragAndDropTile from "../tests/DragAndDropTile";
import DraggableTileTest from "../tests/DraggableTileTest";
import FillOrEmptyBoardSquaresTest from "../tests/FillOrEmptyBoardSquaresTest";
import PutOrRemoveDraggableTileTest from "../tests/PutOrRemoveDraggableTileTest";
import PutOrRemoveTileTest from "../tests/PutOrRemoveTileTest";
import ScaleDraggableTileTest from "../tests/ScaleDraggableTileComponentTest";
import SquareTest from "../tests/SquareTest";
import ChessboardExample from "./DraggableTile";
import Test2 from "./Test2";

function App(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: '#052a50', flex: 1 }}>
      <DragAndDropTile />
    </GestureHandlerRootView>
  )
}

export default App;