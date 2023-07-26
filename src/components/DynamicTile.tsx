import { View, Text } from "react-native";
import React from "react";
import { LetterValue, letter } from "../engine/scrabble";
import RefurbishedTile from "./RefurbishedTile";
import { NeoShadowTile } from "./TileComponent";
import { Neomorph, NeomorphFlex } from "react-native-neomorph-shadows";

type Props = {
	letter: letter;
	tileLength: number;
};

const DynamicTile = ({ letter, tileLength }: Props) => {
	return (
		// <View
		// 	style={{
		// 		flex: 1,
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 		backgroundColor: "#FFF",
		// 	}}>

		// 	<View>
		// 		<NeoShadowTile letter={letter} tileLength={100} />
		// 	</View>
		// </View>
		<Neomorph
			inner
			// swapShadows
			darkShadowColor="#FFF"
			lightShadowColor="#000"
			style={{
				justifyContent: "center",
				alignItems: "center",
				width: tileLength,
				height: tileLength,
				marginBottom: 50,
				backgroundColor: "#FEC76D",
				borderRadius: (15 / 100) * tileLength,
				shadowColor: "#000",
				shadowOpacity: 1,
				shadowRadius: (8 / 100) * tileLength,
			}}>
			<Text
				style={{
					bottom: (10 / 100) * tileLength,
					right: (5 / 100) * tileLength,
					fontSize: (80 / 100) * tileLength,
					fontWeight: "bold",
					color: "#000",
				}}>
				{letter.toUpperCase()}
			</Text>

			<Text
				style={{
					position: "absolute",
					top: (52 / 100) * tileLength,
					right: (15 / 100) * tileLength,
					fontSize: (25 / 100) * tileLength,
					color: "#000",
				}}>
				{LetterValue[letter]}
			</Text>
		</Neomorph>
	);
};

export default DynamicTile;
