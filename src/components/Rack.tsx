import { View, Text } from "react-native";
import React from "react";
import RefurbishedTile from "./RefurbishedTile";
import { SIZE } from "../helpers/Notation";

type RackProps = {
	from: "bottom" | "top";
};

const Rack = (): JSX.Element => {
	const LENGTH: number = 7;
	const tiles: any[] = [...Array(LENGTH)].map((v, i) => i);

	function getTiles(): any[] {
		return tiles;
	}

	function addTile(tile: any): void {
		if (tiles.length < LENGTH) tiles.push(tile);
	}

	function removeTile(index: number): void {
		tiles.splice(index, 1, null);
	}

	function populate(stack: any): void {}

	return (
		<>
			{tiles.map((tile, index) => (
				<RefurbishedTile
					key={index}
					letter={"B"}
					tileLength={SIZE}
					initialOffset={{
						offsetX: { from: "left", value: 55 * (index + 0.5) },
						offsetY: { from: "bottom", value: 75 },
					}}
				/>
			))}
		</>
	);
};

export default Rack;
