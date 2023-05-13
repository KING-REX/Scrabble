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
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Stack from '../objects/stack/Stack';
import TileComponent from './TileComponent';
import { Shadow } from 'react-native-shadow-2';
import SquareComponent from './SquareComponent';
import BoardComponent from './BoardComponent';
import InsetShadow from 'react-native-inset-shadow';

function App(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!


  const stack: Stack = new Stack();
  stack.populate();

  const [stackTiles, setStackTiles] = React.useState(stack.getTiles());

  const [counter, setCounter] = React.useState(0);

  return (
    <BoardComponent></BoardComponent>

    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}>
      
    //     <SquareComponent
    //       length={70}
    //     >

    //     </SquareComponent>
    // </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  tile: {
    height: 50,
    margin: 10,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    elevation: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  tileText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tileContainer: {
    flex: 1,
    flexDirection: 'row',
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
  flatList: {
    flex: 1,
    marginLeft: 20,
  },
});

export default App;