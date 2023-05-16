import Square from '../square/Square';

class Board {

    private __squares: Square[][];
    private __numOfColumns: number;
    private __numOfRows: number;

    constructor(squares?: Square[][], numOfColumns?: number, numOfRows?: number) {
        this.__numOfColumns = numOfColumns ?? 15;
        this.__numOfRows = numOfRows ?? 15;
        this.__squares = squares ?? this.populateBoard(this.__numOfColumns, this.__numOfRows);
    }

    public populateBoard(numOfColumns?: number, numOfRows?: number): Square[][] {
        let squareArray: Square[][] = [];
        for(let i = 0; i < (numOfColumns ?? 15); i++) {
            squareArray[i] = [];
            for(let j = 0; j < (numOfRows ?? 15); j++) {
                squareArray[i][j] = new Square(undefined, i, j);
            }
        }
        return squareArray;
    }

    public getSquares(): Square[][] {
        return this.__squares;
    }

    public setSquares(squares: Square[][]): void {
        this.__squares = squares;
    }

    public getNumOfColumns(): number {
        return this.__numOfColumns;
    }

    public setNumOfColumns(numOfColumns: number): void {
        this.__numOfColumns = numOfColumns;
    }

    public getNumOfRows(): number {
        return this.__numOfRows;
    }

    public setNumOfRows(numOfRows: number): void {
        this.__numOfRows = numOfRows;
    }
}

export default Board;