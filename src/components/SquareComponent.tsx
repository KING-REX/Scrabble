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
    square?: Square,
    style?: StyleProp<ViewStyle> | undefined,
    tile: Tile | null
}

export default function SquareComponent({bgColor, length, square, style, tile}: SquareComponentProps): JSX.Element {

    Square.setLength(length ?? 23);

    tile ? tile.setWidth(Square.getLength()) : tile=null;
    tile ? tile.setHeight(Square.getLength()) : tile=null;

    const [_square, set_Square] = React.useState(square ?? new Square(SquareType.NONE, undefined, undefined, tile ? tile : undefined));

    React.useEffect(()=>{
        console.log(tile);
        updateTile(tile);
    }, [tile])

    bgColor = bgColor ?? '#ddd';

    function updateTile(tile: Tile | null) {
        let square: Square = Square.createSquare(_square)!;
        tile ? tile.setWidth(Square.getLength()) : tile=null;
        tile ? tile.setHeight(Square.getLength()) : tile=null;
        if(tile) {
            if(!square.isOccupied())
                square.putTile(tile);
        }
        else
            square.removeTile();
        set_Square(square);
    }

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
                right={_square.isOccupied() ? true : false}
                bottom={_square.isOccupied() ? true : false}
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
                        tile={_square.getTile()}
                    />
                </View>
            </InsetShadow>
        </View>
    )
}