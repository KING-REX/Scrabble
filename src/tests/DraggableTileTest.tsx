import {
    View,
    StyleSheet,
    Dimensions,
    Pressable,
    Text
} from 'react-native';
import React from 'react';
import TileComponent from '../components/TileComponent';
import Tiles from '../objects/tile/Tiles';

const DraggableTileTest = (): JSX.Element => {

    const [reverse, setReverse] = React.useState(true);

    const width: number = Dimensions.get("window").width;
    const height: number = Dimensions.get("window").height;

    const tileWidth: number = 70;
    const tileHeight: number = 70;

    return (
        <View style={styles.body}>
            <TileComponent
                tile={Tiles.B.tile}
                tileHeight={70}
                tileWidth={70}
                addShadow
                makeDraggable={{
                    x: (width / 2) - (tileWidth / 2),
                    y: (height / 2) - (tileHeight / 2),
                    shouldReverse: reverse,
                }}
            />
            <Pressable
                style={({ pressed }) => ({
                    ...styles.reverseBtn,
                    backgroundColor: pressed ? '#ddd' : (reverse ? '#0ff' : '#fff')
                })}
                onPress={() => setReverse(!reverse)}
            >
                <Text style={styles.reverseText}>{reverse ? 'Don\'t reverse to middle after drag' : 'Reverse to middle after drag'}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    reverseBtn: {
        position: 'absolute',
        backgroundColor: '#FFF',
        padding: 20,
        bottom: 25,
        borderRadius: 10,
        alignSelf: 'center',
    },
    reverseText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '500',
    }
});

export default DraggableTileTest;