import { ColorValue, View } from "react-native/types";
import Square from "../objects/square/Square";

type SquareComponentProps = {
    bgColor: ColorValue,
    length?: number,
    children?: React.ReactNode,
}

export default function SquareComponent({bgColor, length, children}: SquareComponentProps): JSX.Element {

    Square.setLength(length ?? 70);

    return (
        <View
            style={{backgroundColor: bgColor, height: Square.getLength(), width: Square.getLength()}}
        >
            {children}
        </View>
    )
}