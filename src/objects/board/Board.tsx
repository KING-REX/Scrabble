import Square from '../square/SquareObject';

class Board {

    public squares: Square[][] = [[new Square(0,0)], [new Square(0,0), new Square(0,0)]];

}

export default Board;