import React from 'react';
import { StyleSheet, View } from 'react-native';
import Board from '../objects/board/Board';
import SquareComponent from './SquareComponent';
import Square from '../objects/square/Square';

const boardCont = new Board();

export default function BoardComponent(): JSX.Element{
    
    const [board, setBoard] = React.useState(boardCont);

    boardCont.populateBoard();

    return (
        <View style={styles.board}>
            {
                boardCont.getSquares().map((row, rowIndex) => {
                    return (
                        <View key={rowIndex} style={styles.row}>
                            {
                                row.map((cell, cellIndex) => {
                                    return(
                                        <SquareComponent
                                            key={cellIndex}
                                            square={cell}
                                            bgColor={'#ddd'}
                                            style={styles.col}
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
        gap: 5,
        columnGap: 5,
        padding: 3,
        backgroundColor: '#010101'
    },
    row: {
        flexDirection: 'row',
        gap: 1,
    },
    col: {
    }
})