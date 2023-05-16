import React from 'react'
import { 
    ColorValue, 
    Pressable, 
    View, 
    Text,
    StyleSheet,
} from "react-native";
import Square, { SquareType } from "../objects/square/Square";
import { StyleProp } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';
import InsetShadow from 'react-native-inset-shadow';
import TileComponent from './TileComponent';
import Tiles from '../objects/tile/Tiles';
import Tile from '../objects/tile/Tile';

type SquareComponentProps = {
    bgColor?: ColorValue,
    length?: number,
    children?: React.ReactNode,
    square: Square,
    style?: StyleProp<ViewStyle> | undefined,
    tile: Tile | null
}

export default function SquareComponent({bgColor, length, square, style, tile}: SquareComponentProps): JSX.Element {

    Square.setLength(length ?? 23);

    if(!tile)
        tile=square.getTile();

    const [_tile, setTile] = React.useState(tile);

    React.useLayoutEffect(()=>{
        if(tile)
            square!.putTile(tile);
        else
            square.removeTile();
        // console.log(tile)
        setTile(tile);
        // console.log("Updating tile...");
    }, [tile]);

    bgColor = bgColor ?? '#ddd';

    // switch(_square.getType()) {
    //     case SquareType.NONE:
    //         return(
                
    //         )
    //     default:
    //         return <View></View>
    // }

    return (
        <View>
            <InsetShadow
                shadowColor='#000'
                shadowOpacity={1}
                elevation={5}
                right={square.isOccupied() ? true : false}
                bottom={square.isOccupied() ? true : false}
                containerStyle={{
                    height: Square.getLength(), 
                    width: Square.getLength()
                }}
            >
                <View
                    style={[style, {
                        backgroundColor: bgColor,
                    }]}
                >
                    <TileComponent
                        tile={_tile}
                        tileHeight={Square.getLength()}
                        tileWidth={Square.getLength()}
                    />
                </View>
            </InsetShadow>
        </View>
    )
}