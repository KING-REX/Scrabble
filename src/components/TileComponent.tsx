import React from 'react';
import { 
    View, 
    ImageBackground,
    StyleSheet,
    Text
} from 'react-native';
import Tile from '../objects/tile/Tile';
import { getTileImage } from '../objects/tile/Tiles';
import { StyleProp } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Shadow } from 'react-native-shadow-2';

type TileComponentProps = {
    style?: StyleProp<ViewStyle> | undefined,
    tile: Tile | null,
    tileWidth: number,
    tileHeight: number,
    addShadow?: boolean
}

export default function TileComponent({ style, tile, tileWidth, tileHeight, addShadow }: TileComponentProps): JSX.Element {

    const [hasShadow, setHasShadow] = React.useState(addShadow);

    // const [_tileWidth, setTileWidth] = React.useState(tileWidth);

    // const [_tileHeight, setTileHeight] = React.useState(tileHeight);

    const [_tile, setTile] = React.useState(tile);

    React.useLayoutEffect(()=>{
        setTile(tile);
    }, [tile])

    const contents = (): any => {
        return (
            _tile &&
            <ImageBackground
                source={getTileImage(_tile)}
                style={[style, {width: tileWidth, height: tileHeight}]}
                resizeMode='stretch'
            >
                {/* <Text>{Platform.OS}</Text> */}
            </ImageBackground>
        )
    }

    return (
        
        _tile &&

        hasShadow ? 

        <Shadow
            
            style={styles.tile}
            startColor='#00000050'
            endColor='#fff'
            distance={5}
            offset={[10, 11]}
        >
            {contents()}
        </Shadow> :

        <View>
            {contents()}
        </View>

    )
}

const styles = StyleSheet.create({
    tile: {
    }
})