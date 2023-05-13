import { ColorValue, View } from "react-native";
import Square, { SquareType } from "../objects/square/Square";
import { StyleProp } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';

type SquareComponentProps = {
    bgColor?: ColorValue,
    length?: number,
    children?: React.ReactNode,
    square?: Square,
    style?: StyleProp<ViewStyle> | undefined,
}

export default function SquareComponent({bgColor, length, children, square, style}: SquareComponentProps): JSX.Element {

    Square.setLength(length ?? 20);

    square = square ?? new Square(20, SquareType.NONE);

    bgColor = bgColor ?? '#ddd';

    switch(square.getType()) {
        case SquareType.NONE:
            return(
                <View
                    style={[style, {backgroundColor: bgColor, height: Square.getLength(), width: Square.getLength()}]}
                >
                    {children}
                </View>
            )
        default:
            return <View></View>
    }
}