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

function App(): JSX.Element {

  //This is just to test to see whether things are working out fine!
  //The gui alternative for console.log()...
  //This is not the main design !!!


  const stack: Stack = new Stack();
  stack.populate();

  const [stackTiles, setStackTiles] = React.useState(stack.getTiles());

  const [counter, setCounter] = React.useState(0);

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      refreshControl={<RefreshControl refreshing={false} onRefresh={()=>{}} />}
      data={stackTiles}
      style={styles.flatList}
      numColumns={4}
      renderItem={({item})=>{
        
        return (
          // <View style={styles.tile}>
          //   <Text style={styles.tileText}>{item?.toString()}</Text>
          // </View>
          <TileComponent
            tile={item}
            tileHeight={70}
            tileWidth={70}
            addShadow
          />
        )
      }}
    />

    // <ScrollView
      
    // >
    //   <View style={styles.tileContainer}>
    //     <TileComponent
    //       tile={Tiles.A.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.B.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.C.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.D.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //   </View>
    //   <View style={styles.tileContainer}>
    //     <TileComponent
    //       tile={Tiles.E.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.F.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.G.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.H.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //   </View>
    //   <View style={styles.tileContainer}>
    //     <TileComponent
    //       tile={Tiles.A.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.B.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.C.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.D.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //   </View>
    //   <View style={styles.tileContainer}>
    //     <TileComponent
    //       tile={Tiles.A.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.B.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.C.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //     <TileComponent
    //       tile={Tiles.D.tile}
    //       tileWidth={70}
    //       tileHeight={70}
    //       addShadow
    //     />
    //   </View>
    // </ScrollView>
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