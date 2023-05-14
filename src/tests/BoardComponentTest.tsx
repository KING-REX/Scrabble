/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View } from 'react-native';
import BoardComponent from '../components/BoardComponent';

function BoardComponentTest(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0ff',
    }}>
      <BoardComponent />
    </View>
  )
}

export default BoardComponentTest;