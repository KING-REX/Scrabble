import { View, Text } from "react-native";
import React from "react";

const Rack = () => {
	const LENGTH: number = 7;
	const __tiles: any[] = [...Array(LENGTH)].map((v, i) => i);

	function getTiles(): any[] {
		return __tiles;
	}

	function addTile(tile: any): void {
		if (__tiles.length < LENGTH) __tiles.push(tile);
	}

	function removeTile(index: number): void {
		__tiles.splice(index, 1, null);
	}

	function populate(stack: any): void {}

	return (
		<View>
			<Text>Rack</Text>
		</View>
	);
};

export default Rack;
