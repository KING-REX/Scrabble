/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Tiles from '../objects/tile/Tiles';
import Stack from '../objects/stack/Stack';

function App(): JSX.Element {

  const stack: Stack = new Stack();
  stack.populate();

  return (
    <View>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>
        {stack.toString()}
      </Text>
    </View>
  )

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
