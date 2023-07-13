/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Tiles from "../objects/tile/Tiles";
import Tile from "../objects/tile/Tile";
import Square from "../components/Square";
import { DraggableTile, ShadowTile } from "../components/TileComponent";
// import Square from '../objects/square/Square';

function PutOrRemoveDraggableTileTest(): JSX.Element {
	//This is just to test to see whether things are working out fine!
	//The gui alternative for console.log()...
	//This is not the main design !!!

	const [lockOrUnlockTile, setLockOrUnlockTile] = React.useState(false);
	// console.log(putOrRemoveTile);

	// const updateTile = () => {
	//   console.log("Before: " + putOrRemoveTile);
	//   setPutOrRemoveTile(!putOrRemoveTile);
	//   console.log("After: " + putOrRemoveTile);
	// }

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			{lockOrUnlockTile ? (
				<Square
					length={72}
					rowIndex={0}
					colIndex={0}
					tileSharedValue={
						// lockOrUnlockTile ?
						//     <DraggableTile letter='E' tileLength={70} shouldReverse={true} x={0} y={0} /> :
						<ShadowTile letter="E" tileLength={70} />
					}
				/>
			) : (
				<View style={{ top: "-10%", left: "-8%" }}>
					<DraggableTile
						letter="E"
						tileLength={70}
						shouldReverse={false}
						shouldScale={false}
						x={0}
						y={0}
					/>
				</View>
			)}

			{/* <SquareComponent>

            </SquareComponent> */}

			<Pressable
				onPress={() => setLockOrUnlockTile(!lockOrUnlockTile)}
				style={({ pressed }) => ({
					backgroundColor: pressed ? "#ddd" : "#0f0",
					...styles.putOrRemoveTileBtn,
				})}>
				<Text style={styles.putOrRemoveTileText}>Lock/Unlock Tile</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	putOrRemoveTileBtn: {
		marginTop: 20,
		padding: 10,
		borderWidth: 2,
		borderColor: "#000",
		borderRadius: 10,
	},
	putOrRemoveTileText: {
		fontWeight: "bold",
		fontSize: 15,
		color: "#000",
	},
});

export default PutOrRemoveDraggableTileTest;
