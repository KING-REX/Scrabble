/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet
} from 'react-native';
import SquareComponent from '../components/SquareComponent';
import Tiles from '../objects/tile/Tiles';
import Tile from '../objects/tile/Tile';
import Square from '../objects/square/Square';

function PutOrRemoveTileTest(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  const [putOrRemoveTile, setPutOrRemoveTile] = React.useState(false);
  // console.log(putOrRemoveTile);

  const [square, setSquare] = React.useState(new Square());
  
  // const updateTile = () => {
  //   console.log("Before: " + putOrRemoveTile);
  //   setPutOrRemoveTile(!putOrRemoveTile);
  //   console.log("After: " + putOrRemoveTile);
  // }
  
  React.useLayoutEffect(()=>{
    putOrRemoveTile ? square.putTile(Tiles.D.tile) : square.removeTile();
    setSquare(Square.cloneSquare(square)!);
    
  }, [putOrRemoveTile]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      
        <SquareComponent
          length={70}
          style={{
            // marginLeft: 10,
          }}
          tile={square.getTile()}
          square={square}
        >
        </SquareComponent>
        
        <Pressable
            onPress={()=>setPutOrRemoveTile(!putOrRemoveTile)}
            style={({pressed})=>({
                backgroundColor: pressed ? '#ddd' : '#0f0',
                ...styles.putOrRemoveTileBtn
            })}
        >
            <Text style={styles.putOrRemoveTileText}>Put/Remove Tile</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  putOrRemoveTileBtn: {
      marginTop: 20,
      padding: 10,
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 10,
  },
  putOrRemoveTileText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
})

export default PutOrRemoveTileTest;