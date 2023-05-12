import Square from '../square/Square';

class Board {

    private __squares: Square[][];

    constructor(squares?: Square[][], colLength?: number, rowLength?: number) {
        this.__squares = squares ?? this.populateBoard(colLength, rowLength);
    }

    public populateBoard(colLength?: number, rowLength?: number): Square[][] {
        let squareArray: Square[][] = [];
        for(let i = 0; i < (colLength ?? 15); i++) {
            for(let j = 0; j < (rowLength ?? 15); j++) {
                squareArray[i][j] = new Square();
            }
        }
        return squareArray;
    }
}

export default Board;