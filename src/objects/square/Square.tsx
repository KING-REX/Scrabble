import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Tile from "../tile/Tile";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import SquareComponent from "../../components/SquareComponent";
import React from "react";

export enum SquareType {
    NONE,
    DOUBLE_LETTER,
    DOUBLE_WORD,
    TRIPLE_LETTER,
    TRIPLE_WORD
}

export default class Square {
    private static __length: number = 0;
    private __type: SquareType;
    private __coordinates: { x: number, y: number } = {
        x: 0,
        y: 0
    }
    private __tile: Tile | null;
    private __squareComponent: JSX.Element;
    // private setSquareComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
    private __tileState: Tile | null;
    private setTileState: React.Dispatch<React.SetStateAction<Tile | null>>;

    constructor(length?: number, type?: SquareType, coordinateX?: number, coordinateY?: number, tile?: Tile) {
        Square.setLength(length ?? 0);
        this.__type = type ?? SquareType.NONE;
        this.__coordinates.x = coordinateX ?? this.__coordinates.x;
        this.__coordinates.y = coordinateY ?? this.__coordinates.y;
        if (tile) {
            this.updateTileWidthAndHeight(tile);
            this.__tile = tile;

        }
        else
            this.__tile = null;

        [this.__tileState, this.setTileState] = React.useState(this.__tile);

        this.__squareComponent =
            <SquareComponent
                length={Square.getLength()}
                isOccupied={this.isOccupied()}
                tile={this.__tileState}
            >
            </SquareComponent>
    }

    public static cloneSquare(square?: Square): Square | null {
        if (!square)
            return null;
        const tempSquare = new Square();
        tempSquare.__coordinates = square.__coordinates;
        tempSquare.__tile = square.__tile;
        tempSquare.__type = square.__type;
        tempSquare.__squareComponent = square.__squareComponent;
        return tempSquare;
    }

    public static getLength(): number {
        return Square.__length;
    }

    public static setLength(length: number): void {
        Square.__length = length;
    }

    public getType(): SquareType {
        return this.__type;
    }

    public setType(type: SquareType): void {
        this.__type = type;
    }

    public getCoordinates(): { x: number, y: number } {
        return this.__coordinates;
    }

    public setCoordinates(x: number, y: number): void {
        this.__coordinates.x = x;
        this.__coordinates.y = y;
    }

    public getSquareComponent(): JSX.Element {
        return this.__squareComponent;
    }

    public printCoordinates(): string {
        return JSON.stringify(this.getCoordinates());
    }

    public getTile(): Tile | null {
        return this.__tile;
    }

    public getTileIfOccupied(): Tile | void {
        if (this.isOccupied()) {
            return this.__tile!;
        }
    }

    public putTile(tile: Tile): void {
        console.log("Putting tile...");
        if (!this.isOccupied()) {
            this.updateTileWidthAndHeight(tile);
            this.__tile = tile;
            this.updateSquareComponent();
        }
    }

    public forceTile(tile: Tile): void {
        console.log("Forcing tile in...");
        if (this.isOccupied())
            this.removeTile();

        this.putTile(tile);
    }

    public removeTile(): void {
        console.log("Removing tile...");
        this.__tile = null;
        this.updateSquareComponent();
    }

    public isOccupied(): boolean {
        return this.__tile !== null;
    }

    public updateTileWidthAndHeight(tile: Tile): void {
        tile.setHeight(Square.getLength());
        tile.setWidth(Square.getLength());
    }

    // public setupSquareComponent(): JSX.Element {
    //     console.log("Setup square component method called! and tile value is: " + this.__tileState);
    //     return (

    //     )

    // }

    public updateSquareComponent(length?: number, style?: StyleProp<ViewStyle> | undefined): void {
        console.log("UpdateSquareComponent function called!");
        console.log("Immediately after the usc function is called, tile is: " + this.__tile?.toString() + " and tileState is: " + this.__tileState?.toString());
        // Square.setLength(length ?? 23);
        Square.setLength(length ?? 70);

        this.setTileState(this.__tile);

        console.log("Later after the usc function is finished, tile is: " + this.getTile()?.toString() + " and tileState is: " + this.__tileState?.toString());

        // Okay so the thing is, the square component's tile prop doesn't change, and therefore, wouldn't cause a re-render... Instead, the __squareComponent is given a whole new <SquareComponent/> as it's new value
        // and that has to change somehow, so that the square component would re-render when this method is called!
    }
}