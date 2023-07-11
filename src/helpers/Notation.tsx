import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const BOARD_LENGTH = 15;

export const gap = 2.5;
export const grossSize = (width - gap) / BOARD_LENGTH;
export const SIZE = grossSize - gap;
export const INVALID = -1;

export const MIDDLE_HEIGHT = height / 2;

//prettier-ignore
export const BOARD_HEIGHT = gap + (BOARD_LENGTH * grossSize);
export const MID_BOARD = BOARD_HEIGHT / 2;
export const boardOffsetY = MIDDLE_HEIGHT - MID_BOARD;
export const boardOffsetX = 0;

/**
 * Derives a translate x and y values based on the specified square(denoted by an object that contains the row and col properties of the square) of the board
 *
 * @param obj An object that has the row and col properties which stores the values for the row and column indices of the square on the board.
 * @returns an object that contains the derived translation x and y values
 */
export const toTranslation = ({
	indicesObj: { row, col },
	offsets,
}: {
	indicesObj: { row: number; col: number };
	offsets?: { offsetX: number; offsetY: number };
}): { x: number; y: number } => {
	"worklet";
	if (row === INVALID || col === INVALID) return { x: INVALID, y: INVALID };
	if (row < 0 || col < 0) return { x: INVALID, y: INVALID };
	//prettier-ignore
	const x: number = (offsets ? boardOffsetX - offsets.offsetX : boardOffsetX) + (gap + (col * (SIZE + gap)));
	//prettier-ignore
	const y: number = (offsets ? boardOffsetY - offsets.offsetY : boardOffsetY) + (gap + (row * (SIZE + gap)));

	return { x, y };
};

/**
 *
 * @param obj An object that has the x and y translation values to be converted to a square's row and column indices.
 * @returns {row, col} An object that contains the indices of the equivalent square on the board.
 */
export const toIndices = ({
	translationObj: { x, y },
	offsets,
}: {
	translationObj: { x: number; y: number };
	offsets?: { offsetX: number; offsetY: number };
}): { indicesObj: { row: number; col: number } } => {
	"worklet";

	let roundedX: number;
	let roundedY: number;

	// if (x < boardOffsetX || y < boardOffsetY) return { row: INVALID, col: INVALID };

	// console.log("x, y:", x, y);
	// console.log("Info:", boardOffsetY);

	roundedX = Math.round((x - boardOffsetX) / (SIZE + gap));
	roundedY = Math.round((y - boardOffsetY) / (SIZE + gap));

	if (offsets) {
		roundedX = Math.round((x - boardOffsetX + offsets.offsetX) / (SIZE + gap));
		roundedY = Math.round((y - boardOffsetY + offsets.offsetY) / (SIZE + gap));
	}

	if (x === INVALID || y === INVALID) return { indicesObj: { row: INVALID, col: INVALID } };

	const row = roundedY === -0 ? 0 : roundedY < BOARD_LENGTH ? roundedY : -1;
	const col = roundedX === -0 ? 0 : roundedX < BOARD_LENGTH ? roundedX : -1;

	// console.log("row, col:", roundedY, roundedX);
	return { indicesObj: { row, col } };
};
