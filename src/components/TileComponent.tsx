import React, { LabelHTMLAttributes } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Animated,
    ImageSourcePropType,
    Platform
} from 'react-native';
// import Tile from '../objects/tile/Tile';
import { StyleProp } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from '../../node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Shadow } from 'react-native-shadow-2';
import Draggable from 'react-native-draggable';
import { TilesArray } from '../objects/tile/Tiles';

export type letter = "BLANK" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
    | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

type TileComponentProps = {
    style?: StyleProp<ViewStyle> | undefined,
    tileWidth: number,
    tileHeight: number,
    tileImage: ImageSourcePropType,
    addShadow?: boolean,
    makeDraggable?: {
        x?: number,
        y?: number,
        shouldReverse?: boolean,
        shouldScale?: boolean,
        opacityWhileScaling?: number,
    },
}

type TileProps = {
    tileLength: number,
    letter: letter,
    onLayout?: Function,
}

type DraggableTileProps = TileProps & {
    x?: number,
    y?: number,
    shouldReverse?: boolean,
    shouldScale?: boolean,
    opacityWhileScaling?: number,
    addShadow?: boolean
}

export default function Tile({ tileLength, letter, onLayout }: TileProps): JSX.Element {

    const [_letter, setLetter] = React.useState(letter);
    const _value = TilesArray[letter][1];
    const [_tileImage, setTileImage] = React.useState(TilesArray[_letter][2]);
    const [_tileLength, setTileLength] = React.useState(tileLength);

    return (
        <ImageBackground
            source={_tileImage}
            style={{ width: _tileLength, height: _tileLength }}
            resizeMode='stretch'
            onLayout={event => onLayout ? onLayout(event.nativeEvent.layout) : {}}
        >
            {/* <Text>{Platform.OS}</Text> */}
        </ImageBackground>
    )
}

export function ShadowTile({ tileLength, letter, onLayout }: TileProps): JSX.Element {
    return (
        <Shadow
            startColor='#00000050'
            endColor='#fff'
            distance={5}
            offset={[1, 1]}
        >
            <Tile tileLength={tileLength} letter={letter} onLayout={onLayout} />
        </Shadow>
    )
}

export function DraggableTile({ tileLength, letter, onLayout, x, y, shouldReverse, shouldScale, opacityWhileScaling, addShadow }: DraggableTileProps): JSX.Element {
    const [_shouldReverse, setShouldReverse] = React.useState(shouldReverse ?? false);
    const [_shouldScale, setShouldScale] = React.useState(shouldScale ?? false);
    const [_opacityWhileScaling, setOpacityWhileScaling] = React.useState(opacityWhileScaling ?? 1);
    const [hasShadow, setHasShadow] = React.useState(addShadow ?? false);

    const [isDragging, setIsDragging] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    const value = React.useState(new Animated.Value(1))[0];


    React.useEffect(() => {
        x ? undefined : x = 0;
        y ? undefined : y = 0;
    });

    React.useLayoutEffect(() => {
        if ((_shouldScale && isPressed) || (_shouldScale && isDragging)) {
            // console.log("Tile should scale and has been pressed!")
            value.setValue(1.5);
            value.flattenOffset();
            setOpacityWhileScaling(0.5);
        }
        if (!isPressed && !isDragging) {
            value.setValue(1);
            value.flattenOffset();
            setOpacityWhileScaling(1);
        }
    }, [isPressed, _shouldScale, isDragging]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("IsPressed? " + isPressed);
            console.log("IsDragging? " + isDragging);

            if (isPressed && !isDragging) {
                console.log("Is pressed and ! is dragging");
                setIsPressed(false);
            }

            console.log();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [isPressed, isDragging]);

    return (
        <Draggable
            x={x}
            y={y}
            shouldReverse={_shouldReverse}
            onDrag={(event, gestureState) => {
                setIsDragging(true);
            }}
            onDragRelease={(event, gestureState) => {
                setIsPressed(false);
                setIsDragging(false);
            }}
            onPressIn={(event) => {
                setIsPressed(true);
            }}
        >
            {_shouldScale ?
                <Animated.View
                    style={{
                        transform: [
                            { scaleX: _shouldScale ? value : 1 },
                            { scaleY: _shouldScale ? value : 1 },
                            // { translateX: (width / 2) - (tileWidth / 2) },
                            // { translateY: (height) - (tileHeight + 50) }
                        ],
                        width: tileLength,
                        height: tileLength,
                        backgroundColor: '#00bbba',
                        opacity: _shouldScale ? _opacityWhileScaling : 1,
                    }}
                >
                    {
                        hasShadow ?
                            <Tile tileLength={tileLength} letter={letter} /> :
                            <ShadowTile tileLength={tileLength} letter={letter} />
                    }
                </Animated.View> :
                hasShadow ?
                    <Tile tileLength={tileLength} letter={letter} /> :
                    <ShadowTile tileLength={tileLength} letter={letter} />
            }
        </Draggable>
    )
}