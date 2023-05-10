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

    const contents = (): any => {
        return (
            tile &&
            <ImageBackground
                source={getTileImage(tile)}
                style={[style, {width: tileWidth, height: tileHeight}]}
                resizeMode='stretch'
            >
                {/* <Text>{Platform.OS}</Text> */}
            </ImageBackground>
        )
    }

    return (
        
        tile &&

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
        margin: 10,
    }
})