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

function PutOrRemoveTileTest(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  const [putOrRemoveTile, setPutOrRemoveTile] = React.useState(false);

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
          tile={putOrRemoveTile ? Tiles.D.tile : null}
        >
        </SquareComponent>
        
        <Pressable
            onPress={()=>{
              setPutOrRemoveTile(!putOrRemoveTile);
            }}
            style={({pressed})=>({
                backgroundColor: pressed ? '#ddd' : '#0f0',
                ...styles.putOrRemoveTileBtn
            })}
        >
            <Text>Put/Remove Tile</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  putOrRemoveTileBtn: {
      marginTop: 20,
      padding: 10,
      borderRadius: 10,
  }
})

export default PutOrRemoveTileTest;