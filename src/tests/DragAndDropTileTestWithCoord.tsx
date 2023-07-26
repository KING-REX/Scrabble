import { View } from "react-native";
import React from "react";
import Board from "../components/BoardComponent";
import Rack from "../components/Rack";

const DragAndDropTileTest = (): JSX.Element => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Board />

			{/* <RefurbishedTile
				letter="H"
				tileLength={SIZE}
				initialOffset={{
					offsetX: { from: "left", value: 60 },
					offsetY: { from: "bottom", value: 50 },
				}}
			/>
			<RefurbishedTile
				letter="H"
				tileLength={SIZE}
				initialOffset={{
					offsetX: { from: "left", value: 120 },
					offsetY: { from: "bottom", value: 50 },
				}}
			/> */}

			<Rack />
		</View>
	);
};

export default DragAndDropTileTest;
