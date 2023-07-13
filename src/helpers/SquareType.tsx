enum SquareTypeEnum {
	MIDDLE_SQUARE = "",
	NONE = "",
	DOUBLE_LETTER = "DL",
	DOUBLE_WORD = "DW",
	TRIPLE_LETTER = "TL",
	TRIPLE_WORD = "TW",
}

export const SquareType = {
	MIDDLE_SQUARE: {
		color: "",
		symbol: SquareTypeEnum.MIDDLE_SQUARE,
		indices: ["7,7"],
	},
	NONE: {
		color: "#DDD",
		symbol: SquareTypeEnum.NONE,
	},
	DOUBLE_LETTER: {
		color: "#8CC0DE",
		symbol: SquareTypeEnum.DOUBLE_LETTER,
		indices: [
			"0,3",
			"0,11",
			"2,6",
			"2,8",
			"3,0",
			"3,7",
			"3,14",
			"6,2",
			"6,6",
			"6,8",
			"6,12",
			"7,3",
			"7,11",
			"8,2",
			"8,6",
			"8,8",
			"8,12",
			"11,0",
			"11,7",
			"11,14",
			"12,6",
			"12,8",
			"14,3",
			"14,11",
		],
	},
	DOUBLE_WORD: {
		color: "#E55807",
		symbol: SquareTypeEnum.DOUBLE_WORD,
		indices: [
			"1,1",
			"1,13",
			"2,2",
			"2,12",
			"3,3",
			"3,11",
			"4,4",
			"4,10",
			"10,4",
			"10,10",
			"11,3",
			"11,11",
			"12,2",
			"12,12",
			"13,1",
			"13,13",
		],
	},
	TRIPLE_LETTER: {
		color: "#071952",
		symbol: SquareTypeEnum.TRIPLE_LETTER,
		indices: [
			"1,5",
			"1,9",
			"5,1",
			"5,5",
			"5,9",
			"5,13",
			"9,1",
			"9,5",
			"9,9",
			"9,13",
			"13,5",
			"13,9",
		],
	},
	TRIPLE_WORD: {
		color: "#F31559",
		symbol: SquareTypeEnum.TRIPLE_WORD,
		indices: ["0,0", "0,7", "0,14", "7,0", "7,14", "14,0", "14,7", "14,14"],
	},
};

export const getSquareType = (row: number, col: number): keyof typeof SquareType => {
	const squareType = `${row},${col}`;

	if (SquareType.MIDDLE_SQUARE.indices.includes(squareType)) return "MIDDLE_SQUARE";
	else if (SquareType.DOUBLE_LETTER.indices.includes(squareType)) return "DOUBLE_LETTER";
	else if (SquareType.DOUBLE_WORD.indices.includes(squareType)) return "DOUBLE_WORD";
	else if (SquareType.TRIPLE_LETTER.indices.includes(squareType)) return "TRIPLE_LETTER";
	else if (SquareType.TRIPLE_WORD.indices.includes(squareType)) return "TRIPLE_WORD";
	else return "NONE";
};
