/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { 
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import BoardComponent from '../components/BoardComponent';
import Board from '../objects/board/Board';
import Square from '../objects/square/Square';
import Stack from '../objects/stack/Stack';
import Tile from '../objects/tile/Tile';
import UnsupportedOperationException from '../errors/UnsupportedException';

function FillOrEmptyBoardSquaresTest(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  const [tilesFilled, setTilesFilled] = React.useState(false);

  const [board, setBoard] = React.useState(new Board());

  const stack = new Stack();
  stack.populate();

  function fillOrEmptyBoard(board: Board): void {
    if(!tilesFilled) {
      for(let i = 0; i < board.getSquares().length; i++) {
        let tempSquareRow: Square[] = board.getSquares()[i];
        for(let j = 0; j < tempSquareRow.length; j++) {
          let tempSquare: Square = tempSquareRow[j];
          let tempTile: Tile;
          /* Check out how to use try and catch (with a custom defined 
            exception object) in typescript */
          try {
            tempTile = stack.removeTileFrom(0);
            tempSquare.putTile(tempTile);
          } catch (uoe: any) {
            if(uoe instanceof UnsupportedOperationException) {
              stack.populate();
              tempTile = stack.removeTileFrom(0);
              tempSquare.putTile(tempTile);
            }
          }
        }
      }
      
      setTilesFilled(true);
    }
    else {
      for(let i = 0; i < board.getSquares().length; i++) {
        let tempSquareRow: Square[] = board.getSquares()[i];
        for(let j = 0; j < tempSquareRow.length; j++) {
          let tempSquare: Square = tempSquareRow[j];
          tempSquare.removeTile();
        }
      }
      setTilesFilled(false);
    }
    console.log("Board[0][0] square's tile's length: " + board.getSquares()[0][0].getTile()?.toJSONString());
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0ff',
    }}>
        <BoardComponent board={board} />
        
        <Pressable
            onPress={()=>fillOrEmptyBoard(board)}
            style={({pressed})=>({
                backgroundColor: pressed ? '#ddd' : '#0f0',
                ...styles.fillTileBtn
            })}
        >
            <Text style={styles.fillTileText}>Fill/Empty Board</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  fillTileBtn: {
      marginTop: 20,
      padding: 15,
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 10,
    },
  fillTileText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
})

export default FillOrEmptyBoardSquaresTest;