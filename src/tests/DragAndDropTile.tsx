import { View, Text, StyleSheet, LayoutRectangle } from 'react-native'
import React, { useRef } from 'react'
import Square from '../components/SquareComponent'
import { DraggableTile, ShadowTile } from '../components/TileComponent'
import { GestureStateChangeEvent, GestureUpdateEvent, PanGestureChangeEventPayload, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import DragAndDrop from '../../utils/DragAndDrop'
import Animated, { interpolate, interpolateColor, runOnJS, runOnUI, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'

const rowHeight = 50;
const colHeight = rowHeight;
const rowGap = 4;
const colGap = rowGap;

const DragAndDropTile = (): JSX.Element => {

    let boardOffsetX: number = 0;
    let boardOffsetY: number = 0;
    let boardHeight: number = 0;
    let boardWidth: number = 0;

    let currentRowOffsetX: number = 0;
    let currentRowOffsetY: number = 0;

    let tileOffsetX: number = 0;
    let tileOffsetY: number = 0;
    let tileAbsoluteX: number = 0;
    let tileAbsoluteY: number = 0;

    const rowIndex = useSharedValue(-1);
    const colIndex = useSharedValue(-1);

    const boardOffset = (boardLayout: LayoutRectangle) => {
        boardOffsetX = boardLayout.x;
        boardOffsetY = boardLayout.y;
        console.log("Board offset:", boardOffsetX, boardOffsetY);
        boardWidth = boardLayout.height;
        boardWidth = boardLayout.width;
    };

    const currentRowOffset = (rowLayout: LayoutRectangle) => {
        currentRowOffsetX = rowLayout.x;
        currentRowOffsetY = rowLayout.y;
    }

    const tileOffset = (tileLayout: LayoutRectangle) => {
        // tileOffsetX = tileLayout.x;
        // tileOffsetY = tileLayout.y;
        // console.log("Tile offset: " + tileLayout.x);
    }

    const spitOutLayoutParams = (layout: LayoutRectangle) => {
        // console.log("Gotcha... X: ", layout.x);
    }

    const yToRowIndex = (y: number) => {
        // console.log('BoardOffsetY: ', boardOffsetY);
        // const [index0, index1, index2, index3, index4] = [["0.068", ""]]
    }

    const BOARD_SIZE: number = 5;

    const rows = [...Array(BOARD_SIZE)].map((_, i) => i);
    const cells = [...Array(BOARD_SIZE)].map((_, i) => i);

    const squareBgStyle = (i: number, j: number) => useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(rowIndex.value, [-1, 0, 1, 2, 3, 4], [
            '#fff', '#0f0', '#f0f', '#ff0', '#00f', '#AAA'
        ])

        // console.log("In squareBgStyle, i is", i);

        if (rowIndex.value === i && colIndex.value === j)

            return { backgroundColor };

        else
            return { backgroundColor: '#FFF' };
    }, [rowIndex.value])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={styles.board} onLayout={event => boardOffset(event.nativeEvent.layout)}>
                {
                    rows.map((_, i) => {
                        return (
                            <Animated.View
                                key={i}
                                style={[styles.row, {}]}
                                onLayout={(event) => currentRowOffset(event.nativeEvent.layout)}
                            >
                                {
                                    cells.map((_, j) => {
                                        return (
                                            <Square
                                                spitLayout={spitOutLayoutParams}
                                                key={j}
                                                coordinateX={i}
                                                coordinateY={j}
                                                length={rowHeight} style={styles.cell}
                                                bgStyle={squareBgStyle(i, j)}
                                            />
                                        )
                                    })
                                }
                            </Animated.View>
                        )
                    })
                }
            </View>

            <DragAndDrop
                onDragStart={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
                    tileOffsetY = event.absoluteY - tileAbsoluteY;
                    tileOffsetX = event.absoluteX - tileAbsoluteX;
                    // console.log("Event absolute X:", event.absoluteX);
                    // console.log("Event absolute Y:", event.absoluteY);
                    // console.log("Tile absolute X:", tileAbsoluteX);
                    // console.log("Tile absolute Y:", tileAbsoluteY);
                    // console.log("Tile offset X: " + tileOffsetX);
                    // console.log("Tile offset Y: " + tileOffsetY);
                    console.log("Picked at:", event.absoluteX, event.absoluteY);
                }}
                onDrag={(event: GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>) => {
                    // console.log(yToRowIndex(event.absoluteY))

                    // console.log("Tile Absolute Y:", tileAbsoluteY);
                    tileAbsoluteX = event.absoluteX - tileOffsetX;
                    tileAbsoluteY = event.absoluteY - tileOffsetY;
                    let roundedX: number = Math.round((tileAbsoluteX - boardOffsetX) / (colHeight + colGap));
                    let roundedY: number = Math.round((tileAbsoluteY - boardOffsetY) / (rowHeight + rowGap));
                    rowIndex.value = roundedY === -0 ? 0 : roundedY < BOARD_SIZE ? roundedY : -1;
                    colIndex.value = roundedX === -0 ? 0 : roundedX < BOARD_SIZE ? roundedX : -1;

                    // setRowIndex(rowIndex.value);
                    // console.log("Round:", round);
                    // console.log("Col Index:", colIndex.value);
                    // console.log("Row Index:", rowIndex.value);
                }}
                onDrop={(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
                    console.log("Dropped at:", event.absoluteX, event.absoluteY);
                    console.log("Tile absolute coord:", tileAbsoluteX, tileAbsoluteY);
                }}
                onLayout={(event) => {
                    tileAbsoluteX = event.nativeEvent.layout.x;
                    console.log("TAX:", tileAbsoluteX);
                    tileAbsoluteY = event.nativeEvent.layout.y;
                    console.log("TAY:", tileAbsoluteY);
                }}
                style={{ margin: 30, backgroundColor: '#f00' }}
            >
                <ShadowTile letter='B' tileLength={45}
                    onLayout={tileOffset} />
            </DragAndDrop>
        </View>
    )
}

export default DragAndDropTile;

const styles = StyleSheet.create({
    board: {
        gap: rowGap,
        padding: 4,
        backgroundColor: '#fff',
        // borderWidth: 1,
        // borderStyle: 'solid',
    },
    row: {
        columnGap: colGap,
        flexDirection: 'row',
        gap: 1,
    },
    cell: {
        flex: 1,
        zIndex: 10,
    }
});