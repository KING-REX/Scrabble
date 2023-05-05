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
import Stack from '../objects/stack/Stack';

function App(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!


  const stack: Stack = new Stack();
  stack.populate();

  const [stackTiles, setStackTiles] = React.useState(stack.getTiles());

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      refreshControl={<RefreshControl refreshing={false} onRefresh={()=>{}} />}
      data={stackTiles}
      renderItem={({item})=>{
        return (
          <View style={styles.tile}>
            <Text style={styles.tileText}>{item?.toString()}</Text>
          </View>
        )
      }}
    />
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
});

export default App;
