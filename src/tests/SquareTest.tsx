import { View, Text } from "react-native";
import React from "react";
import Square from "../components/Square";
import { ShadowTile } from "../components/TileComponent";

const SquareTest = () => {
	const tile = <ShadowTile letter="E" tileLength={70} />;

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Square
				length={75}
				rowIndex={0}
				colIndex={0}
				tileSharedValue={<ShadowTile letter="E" tileLength={70} />}
			/>
		</View>
	);
};

export default SquareTest;
