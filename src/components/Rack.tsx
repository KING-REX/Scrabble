import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RefurbishedTile from "./RefurbishedTile";
import { SIZE } from "../helpers/Notation";
import { useSharedValue, withTiming } from "react-native-reanimated";

type RackProps = {
	from: "bottom" | "top";
};

const Rack = (): JSX.Element => {
	const LENGTH: number = 7;
	const tiles: any[] = [...Array(LENGTH)].map((v, i) => i);

	const [reset, setReset] = React.useState(false);

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
			<TouchableOpacity
				onPress={() => {
					setReset(!reset);
				}}
				style={{
					position: "absolute",
					top: "10%",
					left: "35%",
					width: "30%",
					height: 50,
					paddingLeft: 10,
					paddingRight: 10,
					borderRadius: 20,
					borderColor: "#000",
					borderWidth: 1,
					borderStyle: "solid",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#FFF",
				}}>
				<Text style={{ color: "#000", fontWeight: "500", fontSize: 20 }}>Reset Tiles</Text>
			</TouchableOpacity>

			{tiles.map((tile, index) => (
				<RefurbishedTile
					key={index}
					index={index}
					letter={"B"}
					tileLength={SIZE}
					initialOffset={{
						offsetX: { from: "left", value: 55 * (index + 0.5) },
						offsetY: { from: "bottom", value: 75 },
					}}
					reset={reset}
				/>
			))}
		</>
	);
};

export default Rack;
