import React from 'react';
import { 
    View, 
    ImageBackground,
    StyleSheet,
    Text
} from 'react-native';
import Tile from '../objects/tile/TileObject';
import Tiles, { getTileImage } from '../objects/tile/Tiles';
import { StyleProp } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';

type TileComponentProps = {
    style?: StyleProp<ViewStyle> | undefined,
    tile: Tile,
    tileWidth: number,
    tileHeight: number,
}

export default function TileComponent({ style, tile, tileWidth, tileHeight }: TileComponentProps): JSX.Element {

    return (
        <ImageBackground
            source={getTileImage(tile)}
            style={[style, {width: tileWidth, height: tileHeight}]}
            resizeMode='stretch'
        >
            {/* <Text>{Platform.OS}</Text> */}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
})