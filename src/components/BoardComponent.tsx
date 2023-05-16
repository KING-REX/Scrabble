import React from 'react';
import { StyleSheet, View } from 'react-native';
import Board from '../objects/board/Board';
import SquareComponent from './SquareComponent';
import Square from '../objects/square/Square';

type BoardComponentProps = {
    board?: Board,
    length?: number,
}

export default function BoardComponent({board, length}: BoardComponentProps): JSX.Element{
    
    const [_board, set_Board] = React.useState(board ?? new Board());

    return (
        <View style={styles.board}>
            {
                _board.getSquares().map((row, rowIndex) => {
                    return (
                        <View key={rowIndex} style={styles.row}>
                            {
                                row.map((cell, cellIndex) => {
                                    return(
                                        <SquareComponent
                                            key={cellIndex}
                                            square={cell}
                                            bgColor={'#fff'}
                                            // style={styles.cell}
                                            tile={null}
                                            // length={length}
                                        ></SquareComponent>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        width: '100%',
        gap: 4,
        padding: 4,
        backgroundColor: '#fff',
    },
    row: {
        width: '100%',
        columnGap: 4,
        flexDirection: 'row',
        gap: 1,
    },
    cell: {
        flex: 1,
    }
})