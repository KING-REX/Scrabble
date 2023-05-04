import Tile from "../tile/Tile";

enum SquareType {
    NONE,
    DOUBLE_LETTER,
    DOUBLE_WORD,
    TRIPLE_LETTER,
    TRIPLE_WORD
}

export default class Square {
    private static __width: number = 0;
    private static __height: number = 0;
    private __type: SquareType;
    private __coordinates: {x: number, y: number} = {
        x: 0,
        y: 0
    }
    private __tile: Tile | null;

    constructor(type?: SquareType, coordinateX?: number, coordinateY?: number) {
        this.__type = type ?? SquareType.NONE;
        this.__coordinates.x = coordinateX!;
        this.__coordinates.y = coordinateY!;
        this.__tile = null;
    }

    public static getWidth(): number {
        return Square.__width;
    }

    public static setWidth(width: number): void {
        Square.__width = width;
    }

    public static getHeight(): number {
        return Square.__height;
    }

    public static setHeight(height: number): void {
        Square.__height = height;
    }

    public getType(): SquareType {
        return this.__type;
    }

    public setType(type: SquareType): void {
        this.__type = type;
    }

    public getCoordinates(): {x: number, y: number} {
        return this.__coordinates;
    }

    public setCoordinates(x: number, y: number): void {
        this.__coordinates.x = x;
        this.__coordinates.y = y;
    }

    public getTileIfOccupied(): Tile | void {
        if(this.isOccupied()) {
            return this.__tile!;
        }
    }

    public putTile(tile: Tile): void {
        if(!this.isOccupied())
            this.__tile = tile;
    }

    public forceTile(tile: Tile): void {
        this.__tile = tile;
    }

    public removeTile(): void {
        this.__tile = null;
    }

    public isOccupied(): boolean {
        return this.__tile !== null;
    }
}