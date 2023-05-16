import UnsupportedOperationException from "../../errors/UnsupportedException";
import Tile from "../tile/Tile";
import Tiles from "../tile/Tiles";

type TilesKey = keyof typeof Tiles;

enum TileCount {
    BLANK = 2,
    A = 9,
    B = 2,
    C = 2,
    D = 4,
    E = 12,
    F = 2,
    G = 3,
    H = 2,
    I = 9,
    J = 1,
    K = 1,
    L = 4,
    M = 2,
    N = 6,
    O = 8,
    P = 2,
    Q = 1,
    R = 6,
    S = 4,
    T = 6,
    U = 4,
    V = 2,
    W = 2,
    X = 1,
    Y = 2,
    Z = 1
}

type random = keyof typeof TileCount[];

export default class Stack {
    private __allTilesCount: {tiles: string[], tileCounts: (string | TileCount)[]} = {
        tiles: Object.keys(TileCount),
        tileCounts: (Object.values(TileCount).filter((obj)=>(!isNaN(Number(obj)))))
    } 
    private __tiles: Tile[];
    private static LENGTH: number = 100;
    private __stackLength: number;

    constructor() {
        this.__tiles = new Array(Stack.LENGTH);
        this.__stackLength = this.__tiles.length;
    }

    public getRandomTileFromStack(): Tile {
        if(this.getStackLength() === 0)
            throw new UnsupportedOperationException("Stack is Empty!");

        let randomTilePosition = Math.floor(Math.random() * this.__stackLength + 1);
        return this.removeTileFrom(randomTilePosition);
    }

    public getTiles(): Tile[] {
        return this.__tiles;
    }

    // public addTile(tile: Tile): void {
    //     if(this.__tiles.length < Stack.LENGTH)
    //         this.__tiles.push(tile);
    // }

    public peekTileFrom(index: number): Tile {
        if(this.getStackLength() === 0)
            throw new UnsupportedOperationException("Stack is Empty!");
        return this.__tiles[index];
    }

    public removeTileFrom(index: number): Tile {
        if(this.getStackLength() === 0)
            throw new UnsupportedOperationException("Stack is Empty!");
        let tile: Tile = this.__tiles.splice(index, 1)[0];
        this.evaluateStackLength();
        return tile;
    }

    public getStackLength(): number {
        return this.__tiles.length;
    }

    public populate(): void {
        if(this.getStackLength() === 0)
            this.__tiles = new Array(Stack.LENGTH);
        let counter: number = 0;
        let keyCounter: number = 0;
        
        const tileCountKeys: string[] = Object.keys(TileCount).filter((key) => isNaN(Number(key)));
        
        const tileCountValues: (string|TileCount)[] = 
            Object.values(TileCount).filter((value) => !isNaN(Number(value)));

        for(let i = 0; i < Stack.LENGTH; i++, counter++) {

            let tileCountKey = tileCountKeys[keyCounter];
            let tileCountValue: number = Number(tileCountValues[keyCounter]);

            this.__tiles[i] = Tiles[tileCountKey as TilesKey].tile;

            if(counter === tileCountValue - 1) {
                counter = -1;
                keyCounter++;
            }
        }
    }

    public evaluateStackLength(): void {
        this.__stackLength = this.__tiles.length;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}