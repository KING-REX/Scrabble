import { Dimensions } from "react-native";
import { board_OffsetX, board_OffsetY } from "../components/BoardComponent";

const { width } = Dimensions.get("window");

export const BOARD_LENGTH = 15;

export const gap = 2.5;
export const grossSize = (width - gap) / BOARD_LENGTH;
export const SIZE = grossSize - gap;
export const INVALID = -1;

/**
 *
 * @param obj An object that has the row and col properties which stores the values for the row and column indices of the square on the board.
 * @returns {x, y} An object that contains the derived translation x and y values
 */
export const toTranslation = ({
	row,
	col,
}: {
	row: number;
	col: number;
}): { x: number; y: number } => {
	if (row === INVALID || col === INVALID) return { x: INVALID, y: INVALID };
	//prettier-ignore
	const x: number = board_OffsetX + (gap + (col * (SIZE + gap)));
	//prettier-ignore
	const y: number = board_OffsetY + (gap + (row * (SIZE + gap)));

	return { x, y };
};

/**
 *
 * @param obj An object that has the x and y translation values to be converted to a square's row and column indices.
 * @returns {row, col} An object that contains the indices of the equivalent square on the board.
 */
export const toIndices = ({ x, y }: { x: number; y: number }): { row: number; col: number } => {
	if (x === INVALID || y === INVALID) return { row: INVALID, col: INVALID };

	let roundedX: number = Math.round((x - board_OffsetX) / (SIZE + gap));
	let roundedY: number = Math.round((y - board_OffsetY) / (SIZE + gap));

	const row = roundedY === -0 ? 0 : roundedY < BOARD_LENGTH ? roundedY : -1;
	const col = roundedX === -0 ? 0 : roundedX < BOARD_LENGTH ? roundedX : -1;

	return { row, col };
};
