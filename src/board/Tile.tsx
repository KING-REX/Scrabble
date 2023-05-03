type letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" 
    | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

type value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface TileInterface {
    letter: letter;
    value: value;
}


export class Tile implements TileInterface {

    private __letter: letter;
    private __value: value;

    constructor(public letter: letter, public value: value) {
        this.__letter = letter;
        this.__value = value;
    }

    public getLetter(): string {
        return this.__letter;
    }

    public setLetter(letter: letter) {
        this.__letter = letter;
    }

    public getValue(): value {
        return this.__value;
    }

    public setValue(value: value): void {
        this.__value = value;
    }

    public toJSON(): string {
        return JSON.stringify({
            letter: this.getLetter(),
            value: this.getValue()
        })
    }

    public toString() {
        return `Tile ${this.__letter}|${this.__value}`;
    }

    public static createTile(letter: letter, value: value): Tile {
        return new Tile(letter, value);
    }
}

const func = () => {
    let a = Tiles.A;
    a.toJSON();
}


export const Tiles = {
    A: new Tile('A', 1),

    B: new Tile('B', 3),

    C: new Tile('C', 3),

    D: new Tile('D', 2),

    E: new Tile('E', 1),

    F: new Tile('F', 4),

    G: new Tile('G', 2),

    H: new Tile('H', 4),

    I: new Tile('I', 1),

    J: new Tile('J', 8),

    K: new Tile('K', 5),

    L: new Tile('L', 1),

    M: new Tile('M', 3),

    N: new Tile('N', 1),

    O: new Tile('O', 1),

    P: new Tile('P', 3),

    Q: new Tile('Q', 10),

    R: new Tile('R', 1),

    S: new Tile('S', 1),

    T: new Tile('T', 1),

    U: new Tile('U', 1),

    V: new Tile('V', 4),

    W: new Tile('W', 4),

    X: new Tile('X', 8),

    Y: new Tile('Y', 4),

    Z: new Tile('Z', 10)
};