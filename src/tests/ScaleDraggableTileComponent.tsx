import {
    View,
    StyleSheet,
    Dimensions,
    Pressable,
    Text,
    Animated
} from 'react-native';
import React from 'react';
import TileComponent from '../components/TileComponent';
import Tiles from '../objects/tile/Tiles';

const ScaleDraggableTileTest = (): JSX.Element => {

    const width: number = Dimensions.get("window").width;
    const height: number = Dimensions.get("window").height;

    const [tileWidth, setTileWidth] = React.useState(70);
    const [tileHeight, setTileHeight] = React.useState(70);
    const [hasDragStarted, setHasDragStarted] = React.useState(false);

    const value = React.useState(new Animated.Value(1))[0];

    return (
        <View style={styles.body}>
            <TileComponent
                tile={Tiles.B.tile}
                tileHeight={tileHeight}
                tileWidth={tileWidth}
                addShadow
                makeDraggable={{
                    x: (width / 2) - (tileWidth / 2),
                    // y: (height / 2) - (tileHeight / 2),
                    y: height - tileHeight - 50,
                    shouldReverse: true,
                    shouldScale: true
                }}
            />
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

export default ScaleDraggableTileTest;