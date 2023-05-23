/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import BoardComponentTest from "../tests/BoardComponentTest";
import DraggableTileTest from "../tests/DraggableTileTest";
import FillOrEmptyBoardSquaresTest from "../tests/FillOrEmptyBoardSquaresTest";
import PutOrRemoveTileTest from "../tests/PutOrRemoveTileTest";
import ScaleDraggableTileTest from "../tests/ScaleDraggableTileComponent";

function App(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  return (
    <ScaleDraggableTileTest />
  )
}

export default App;