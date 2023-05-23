import React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Animated
} from 'react-native';
import Tile from '../objects/tile/Tile';
import { getTileImage } from '../objects/tile/Tiles';
import { StyleProp } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Shadow } from 'react-native-shadow-2';
import Draggable from 'react-native-draggable';

type TileComponentProps = {
    style?: StyleProp<ViewStyle> | undefined,
    tile: Tile | null,
    tileWidth: number,
    tileHeight: number,
    addShadow?: boolean,
    makeDraggable?: {
        x?: number,
        y?: number,
        shouldReverse?: boolean,
        shouldScale?: boolean,
        opacity?: number,
    },
}

export default function TileComponent({ style, tile, tileWidth, tileHeight, addShadow, makeDraggable }: TileComponentProps): JSX.Element {

    const [shouldReverse, setShouldReverse] = React.useState(true);

    const [isDraggable, setIsDraggable] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isLongPressing, setIsLongPressing] = React.useState(false);

    const [hasShadow, setHasShadow] = React.useState(addShadow);

    // const [_tileWidth, setTileWidth] = React.useState(tileWidth);

    // const [_tileHeight, setTileHeight] = React.useState(tileHeight);

    const [_tile, setTile] = React.useState(tile);

    const value = React.useState(new Animated.Value(1))[0];
    const [valueNum, setValueNum] = React.useState(1);

    const [x, setX] = React.useState(makeDraggable!.x);
    const [y, setY] = React.useState(makeDraggable!.y);

    const [opacity, setOpacity] = React.useState(makeDraggable!.opacity);


    React.useEffect(() => {
        if (makeDraggable) {
            setIsDraggable(true);
            makeDraggable.x ? undefined : makeDraggable.x = 0;
            makeDraggable.y ? undefined : makeDraggable.y = 0;
            if (makeDraggable.shouldReverse) {
                setShouldReverse(makeDraggable.shouldReverse);
            }
        }
        else
            setIsDraggable(false);
    })

    React.useLayoutEffect(() => {
        setShouldReverse(makeDraggable?.shouldReverse!);
    }, [makeDraggable?.shouldReverse])

    React.useLayoutEffect(() => {
        setTile(tile);
    }, [tile])

    React.useEffect(() => {
        console.log("x has changed to: " + makeDraggable?.x);
    }, [makeDraggable?.x])

    React.useLayoutEffect(() => {
        if (makeDraggable?.shouldScale && isDragging) {
            value.setValue(2);
            setOpacity(0.5);
        }
        else {
            value.setValue(1);
            setOpacity(1);
        }
    }, [isDragging])

    const contents = (): any => {
        return (
            _tile &&
            <ImageBackground
                source={getTileImage(_tile)}
                style={[style, { width: tileWidth, height: tileHeight }]}
                resizeMode='stretch'
            >
                {/* <Text>{Platform.OS}</Text> */}
            </ImageBackground>
        )
    }

    const shadowContents = (): any => {
        return (hasShadow ?
            <Shadow

                style={styles.tile}
                startColor='#00000050'
                endColor='#fff'
                distance={5}
                offset={[1, 1]}
            >
                {contents()}
            </Shadow> :

            <>
                {contents()}
            </>

        )
    }

    const draggableContents = (): any => {
        return (
            isDraggable ?
                <Draggable
                    x={x}
                    y={y}
                    // x={0}
                    // y={0}
                    shouldReverse={shouldReverse}
                    onDrag={(event, gestureState) => {
                        setIsDragging(true);
                        // let tempNum = (gestureState.dx / 10) + valueNum;
                        // tempNum >= 2 ? tempNum = 2 : undefined;
                        // tempNum <= 1 ? tempNum = 1 : undefined;
                        // makeDraggable!.shouldScale ? value.setValue(tempNum) : undefined;
                        // setValueNum(tempNum);

                        // setX(gestureState.moveX);
                        // setY(gestureState.moveY);
                    }}
                    onPressIn={(event) => {
                        setIsDragging(true);
                        // makeDraggable!.shouldScale ?
                        //     Animated.timing(value, {
                        //         toValue: 2,
                        //         duration: 500,
                        //         useNativeDriver: true
                        //     }).start() : undefined;
                    }}
                    onLongPress={(event) => {
                        // setIsDragging(false);
                    }}
                    onPressOut={(event) => {
                        // if (!isDragging && isLongPressing) {
                        //     if (makeDraggable!.shouldScale) {
                        //         value.setValue(1);
                        //         setOpacity(1);
                        //     }
                        // }
                    }}
                    onShortPressRelease={(event) => {
                        setIsDragging(false);
                    }}
                    onDragRelease={(event, gestureState) => {
                        setIsDragging(false);
                        // Animated.timing(value, {
                        //     toValue: 1,
                        //     duration: 500,
                        //     useNativeDriver: true
                        // }).start()


                        // makeDraggable!.shouldScale ? setValueNum(1) : undefined;
                    }}
                >
                    <Animated.View
                        style={{
                            transform: [
                                { scaleX: value },
                                { scaleY: value },
                                // { translateX: (width / 2) - (tileWidth / 2) },
                                // { translateY: (height) - (tileHeight + 50) }
                            ],
                            width: 70,
                            height: 70,
                            backgroundColor: '#00bbba',
                            opacity: opacity,
                        }}
                    >
                        {shadowContents()}
                    </Animated.View>
                </Draggable> :

                <>
                    {shadowContents()}
                </>
        )
    }

    return (
        <>
            {draggableContents()}
        </>
    )
}

const styles = StyleSheet.create({
    tile: {
    }
})