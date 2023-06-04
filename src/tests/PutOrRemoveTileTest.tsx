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
import Square from '../components/SquareComponent';
import { ShadowTile } from '../components/TileComponent';
// import Square, { SquareType } from '../objects/square/Square';

function PutOrRemoveTileTest(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  const [putOrRemoveTile, setPutOrRemoveTile] = React.useState(true);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Square
        length={70}
        coordinateX={0}
        coordinateY={0}
        tile={
          putOrRemoveTile ?
            <ShadowTile letter='E' tileLength={70} /> :
            undefined
        }
      />
      <Pressable
        onPress={() => setPutOrRemoveTile(!putOrRemoveTile)}
        style={({ pressed }) => ({
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