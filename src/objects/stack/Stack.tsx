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
    Q = 10,
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

type StackTile = Tile | null;

export default class Stack {
    private __tiles: StackTile[];
    private static LENGTH: number = 100;

    constructor() {
        this.__tiles = new Array(Stack.LENGTH);
        this.__tiles.fill(null);
    }

    public getTiles(): StackTile[] {
        return this.__tiles;
    }

    public addTile(tile: Tile): void {
        if(this.__tiles.length < Stack.LENGTH)
            this.__tiles.push(tile);
    }

    public removeTile(index: number): void {
        this.__tiles.splice(index, 1, null);
    }

    public populate(): void {
        let counter: number = 0;
        let keyCounter: number = 0;
        
        const tileCountKeys: string[] = Object.keys(TileCount).filter((key) => isNaN(Number(key)));
        
        const tileCountValues: (string|TileCount)[] = 
            Object.values(TileCount).filter((value) => !isNaN(Number(value)));

        for(let i = 0; i < Stack.LENGTH; i++, counter++) {

            let tileCountKey = tileCountKeys[keyCounter];
            let tileCountValue: number = Number(tileCountValues[keyCounter]);

            this.__tiles[i] = Tiles[tileCountKey as TilesKey];

            if(counter === tileCountValue - 1) {
                counter = -1;
                keyCounter++;
            }
        }
    }
}