import Square from "../square/Square";

type letter = "BLANK" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" 
    | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

type value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface TileInterface {
    getLetter(): letter;
    setLetter(letter: letter): void;
    getValue(): value;
    setValue(value: value): void;
    getWidth(): number;
    setWidth(width: number): void;
    getHeight(): number;
    setHeight(height: number): void;
    toJSON(): any,
    toJSONString(): string;
    toString(): string;
}


export default class Tile implements TileInterface {

    private __letter: letter;
    private __value: value;
    private __tileWidth: number;
    private __tileHeight: number;

    constructor(__letter?: letter, __value?: value, __tileWidth?: number,
        __tileHeight?: number) {
        this.__letter = __letter ?? "A";
        this.__value = __value ?? 1;
        this.__tileWidth = __tileWidth ?? Square.getLength();
        this.__tileHeight = __tileHeight ?? Square.getLength();
    }

    public getLetter(): letter {
        return this.__letter;
    }

    public getLetterAsString(): string {
        return this.__letter;
    }

    public setLetter(letter: letter): void {
        this.__letter = letter;
    }

    public getValue(): value {
        return this.__value;
    }

    public setValue(value: value): void {
        this.__value = value;
    }

    public getWidth(): number {
        return this.__tileWidth;
    }

    public setWidth(tileWidth: number) {
        this.__tileWidth = tileWidth;
    }

    public getHeight(): number {
        return this.__tileHeight;
    }

    public setHeight(tileHeight: number) {
        this.__tileHeight = tileHeight;
    }

    public static cloneTile(tile?: Tile | null): Tile | null {
        if(!tile)
            return null;
        const tempTile = new Tile();
        tempTile.__letter = tile.__letter;
        tempTile.__value = tile.__value;
        tempTile.__tileWidth = tile.__tileWidth;
        tempTile.__tileHeight = tile.__tileHeight;

        return tempTile;
    }

    public static fromJSON(json: any): Tile {
        let tile: Tile = new Tile();
        tile.setLetter(json.letter);
        tile.setValue(json.value);
        return tile;
    }

    public static fromJSONString(jsonString: string): Tile {
        let json: JSON = JSON.parse(jsonString);
        return Tile.fromJSON(json);
    }

    public toJSON(): any {
        return JSON.parse(this.toJSONString());
    }

    public toJSONString(): string {
        return JSON.stringify(
            {
                letter: this.getLetter(),
                value: this.getValue(),
                width: this.getWidth(),
                height: this.getHeight(),
            }
        )
    }

    public toString(): string {
        return `Tile(${this.__letter}-${this.__value})`;
    }

    // public static createTileFromJSON(json: JSON): Tile {
    //     let string: string = JSON.stringify(json);
    //     return new Tile();
    // }

    public static createTile(letter: letter, value: value): Tile {
        return new Tile(letter, value);
    }
}