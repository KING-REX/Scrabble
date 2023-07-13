import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import TileComponent from "../../components/TileComponent";
import Square from "../square/Square";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { ImageSourcePropType } from "react-native/types";
import React from "react";

type letter =
	| "BLANK"
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z";

type value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface TileInterface {
	getLetter(): letter;
	setLetter(letter: letter): void;
	getValue(): value;
	setValue(value: value): void;
	getLength(): number;
	setLength(width: number): void;
	toJSON(): any;
	toJSONString(): string;
	toString(): string;
}

export default class Tile extends React.Component implements TileInterface {
	private __letter: letter;
	private __value: value;
	private __tileWidth: number;
	private __tileHeight: number;
	private __tileComponent: JSX.Element;
	private __tileImage: ImageSourcePropType;

	constructor(
		__letter?: letter,
		__value?: value,
		__tileImage?: ImageSourcePropType,
		__tileWidth?: number,
		__tileHeight?: number,
		addShadow?: boolean,
		makeDraggable?: {
			x?: number;
			y?: number;
			shouldReverse?: boolean;
			shouldScale?: boolean;
			opacityWhileScaling?: number;
		}
	) {
		super({});
		this.__letter = __letter ?? "A";
		this.__value = __value ?? 1;
		this.__tileImage = __tileImage ?? require("../../../resources/images/tiles/A.jpg");
		this.__tileWidth = __tileWidth ?? Square.getLength();
		this.__tileHeight = __tileHeight ?? Square.getLength();
		this.__tileComponent = this.updateTileComponent(addShadow ?? false, makeDraggable);
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

	public getLength(): number {
		return this.__tileHeight;
	}

	public setLength(tileHeight: number) {
		this.__tileHeight = tileHeight;
	}

	public getTileImage(): ImageSourcePropType {
		return this.__tileImage;
	}

	public setTileImage(tileImage: ImageSourcePropType): void {
		this.__tileImage = tileImage;
	}

	public getTileComponent(addShadow?: boolean): JSX.Element {
		this.updateTileComponent(addShadow ?? false);
		return this.__tileComponent;
	}

	public setTileComponent(tileComponent: JSX.Element): void {
		this.__tileComponent = tileComponent;
	}

	public static cloneTile(tile?: Tile | null): Tile | null {
		if (!tile) return null;
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
		return JSON.stringify({
			letter: this.getLetter(),
			value: this.getValue(),
			width: this.getLength(),
			height: this.getLength(),
		});
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

	public updateTileComponent(
		addShadow: boolean,
		makeDraggable?: {
			x?: number;
			y?: number;
			shouldReverse?: boolean;
			shouldScale?: boolean;
			opacityWhileScaling?: number;
		},
		style?: StyleProp<ViewStyle> | undefined
	): JSX.Element {
		this.__tileComponent = (
			<TileComponent letter={this.__letter} tileLength={this.getLength()} />
		);

		return this.__tileComponent;
	}
}
