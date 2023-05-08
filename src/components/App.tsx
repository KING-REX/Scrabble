/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Stack from '../objects/stack/StackObject';
import TileComponent from './TileComponent';
import { Shadow } from 'react-native-shadow-2';
import Tiles from '../objects/tile/Tiles';

function App(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!


  const stack: Stack = new Stack();
  stack.populate();

  const [stackTiles, setStackTiles] = React.useState(stack.getTiles());

  return (
    // <FlatList
    //   keyExtractor={(item, index) => index.toString()}
    //   refreshControl={<RefreshControl refreshing={false} onRefresh={()=>{}} />}
    //   data={stackTiles}
    //   renderItem={({item})=>{
    //     return (
    //       <View style={styles.tile}>
    //         <Text style={styles.tileText}>{item?.toString()}</Text>
    //       </View>
    //     )
    //   }}
    // />

    <View style={styles.tileContainer}>
      <Shadow
        // style={styles.shadowStyle}
        style={styles.tile}
        startColor='#00000050'
        endColor='#fff'
        distance={5}
        offset={[10, 11]}
      >
        <TileComponent
          tile={Tiles.A.tile}
          tileWidth={70}
          tileHeight={70}
        />
      </Shadow>
      <Shadow
        // style={styles.shadowStyle}
        style={styles.tile}
        startColor='#00000050'
        endColor='#fff'
        distance={5}
        offset={[10, 11]}
      >
        <TileComponent
          tile={Tiles.B.tile}
          tileWidth={70}
          tileHeight={70}
        />
      </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  // tile: {
  //   height: 50,
  //   margin: 10,
  //   marginTop: 5,
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   shadowColor: '#000',
  //   elevation: 5,
  //   backgroundColor: '#fff',
  //   flex: 1,
  // },
  tile: {
    margin: 10,
  },
  tileText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: .8,
    shadowRadius: 1,
    elevation: 5
  },
});

export default App;
