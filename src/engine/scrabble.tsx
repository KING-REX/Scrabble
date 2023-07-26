export enum BonusType {
	NONE = "N",
	DOUBLE_LETTER = "DL",
	DOUBLE_WORD = "DW",
	MIDDLE_SQUARE = "MS",
	TRIPLE_LETTER = "TL",
	TRIPLE_WORD = "TW",
}

//prettier-ignore
export enum LetterValue {
    BLANK = 0,  A = 1,  B = 3,  C = 3,  D = 2,  E = 1,  F = 4,  G = 2,  H = 4,
    
    I = 1,      J = 8,  K = 5,  L = 1,  M = 3,  N = 1,  O = 1,  P = 3,  Q = 10,
    
    R = 1,      S = 1,  T = 1,  U = 1,  V = 4,  W = 4,  X = 8,  Y = 4,  Z = 10,
}

//prettier-ignore
type Square =
     "0,0" |  "0,1" |  "0,2" |  "0,3" |  "0,4" |  "0,5" |  "0,6" |  "0,7" |  "0,8" |  "0,9" |  "0,10" |  "0,11" |  "0,12" |  "0,13" |  "0,14" |
     "1,0" |  "1,1" |  "1,2" |  "1,3" |  "1,4" |  "1,5" |  "1,6" |  "1,7" |  "1,8" |  "1,9" |  "1,10" |  "1,11" |  "1,12" |  "1,13" |  "1,14" |
     "2,0" |  "2,1" |  "2,2" |  "2,3" |  "2,4" |  "2,5" |  "2,6" |  "2,7" |  "2,8" |  "2,9" |  "2,10" |  "2,11" |  "2,12" |  "2,13" |  "2,14" |
     "3,0" |  "3,1" |  "3,2" |  "3,3" |  "3,4" |  "3,5" |  "3,6" |  "3,7" |  "3,8" |  "3,9" |  "3,10" |  "3,11" |  "3,12" |  "3,13" |  "3,14" |
     "4,0" |  "4,1" |  "4,2" |  "4,3" |  "4,4" |  "4,5" |  "4,6" |  "4,7" |  "4,8" |  "4,9" |  "4,10" |  "4,11" |  "4,12" |  "4,13" |  "4,14" |
     "5,0" |  "5,1" |  "5,2" |  "5,3" |  "5,4" |  "5,5" |  "5,6" |  "5,7" |  "5,8" |  "5,9" |  "5,10" |  "5,11" |  "5,12" |  "5,13" |  "5,14" |
     "6,0" |  "6,1" |  "6,2" |  "6,3" |  "6,4" |  "6,5" |  "6,6" |  "6,7" |  "6,8" |  "6,9" |  "6,10" |  "6,11" |  "6,12" |  "6,13" |  "6,14" |
     "7,0" |  "7,1" |  "7,2" |  "7,3" |  "7,4" |  "7,5" |  "7,6" |  "7,7" |  "7,8" |  "7,9" |  "7,10" |  "7,11" |  "7,12" |  "7,13" |  "7,14" |
     "8,0" |  "8,1" |  "8,2" |  "8,3" |  "8,4" |  "8,5" |  "8,6" |  "8,7" |  "8,8" |  "8,9" |  "8,10" |  "8,11" |  "8,12" |  "8,13" |  "8,14" |
     "9,0" |  "9,1" |  "9,2" |  "9,3" |  "9,4" |  "9,5" |  "9,6" |  "9,7" |  "9,8" |  "9,9" |  "9,10" |  "9,11" |  "9,12" |  "9,13" |  "9,14" |
    "10,0" | "10,1" | "10,2" | "10,3" | "10,4" | "10,5" | "10,6" | "10,7" | "10,8" | "10,9" | "10,10" | "10,11" | "10,12" | "10,13" | "10,14" |
    "11,0" | "11,1" | "11,2" | "11,3" | "11,4" | "11,5" | "11,6" | "11,7" | "11,8" | "11,9" | "11,10" | "11,11" | "11,12" | "11,13" | "11,14" |
    "12,0" | "12,1" | "12,2" | "12,3" | "12,4" | "12,5" | "12,6" | "12,7" | "12,8" | "12,9" | "12,10" | "12,11" | "12,12" | "12,13" | "12,14" |
    "13,0" | "13,1" | "13,2" | "13,3" | "13,4" | "13,5" | "13,6" | "13,7" | "13,8" | "13,9" | "13,10" | "13,11" | "13,12" | "13,13" | "13,14" |
    "14,0" | "14,1" | "14,2" | "14,3" | "14,4" | "14,5" | "14,6" | "14,7" | "14,8" | "14,9" | "14,10" | "14,11" | "14,12" | "14,13" | "14,14";

function row(square: Square): number {
	const tokens = square.split(",");
	if (tokens.length !== 2) {
		throw new Error("Invalid Operation: Argument passed is not a valid square");
	}

	return parseInt(tokens[0]);
}

function col(square: Square): number {
	const tokens = square.split(",");
	if (tokens.length !== 2) {
		throw new Error("Invalid Operation: Argument passed is not a valid square");
	}

	return parseInt(tokens[1]);
}

function boardRow(indexOnBoard: number) {
	return Math.floor(indexOnBoard / 15);
}

function boardCol(indexOnBoard: number) {
	return indexOnBoard % 15;
}

function toSquare(row: number, col: number): Square {
	return `${row},${col}` as Square;
}

type Turn = typeof PLAYER1 | typeof PLAYER2;

const PLAYER1 = "p1";
const PLAYER2 = "p2";

function swapTurns(turn: Turn) {
	return turn === "p1" ? "p2" : "p1";
}

//prettier-ignore
export type letter = "BLANK" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

type value = 1 | 2 | 3 | 4 | 5 | 8 | 10;

type Direction = "h" | "v";

type Character = {
	type: BonusType;
	letter: letter;
};

export type Word = Character[];

export function calculateRawScore(word: Word): number {
	let total = 0;
	for (let i = 0; i < word.length; i++) {
		let character = word[i];
		total += LetterValue[character.letter];
	}
	return total;
}

export function calculateDerivedScore(word: Word, isBingo: boolean) {
	let total = 0;
	let doubleWordBonuses = 0;
	let tripleWordBonuses = 0;
	for (let i = 0; i < word.length; i++) {
		let character = word[i];
		let characterValue: LetterValue = LetterValue[character.letter];
		if (character.type === BonusType.DOUBLE_LETTER) {
			total += characterValue * 2;
		} else if (character.type === BonusType.TRIPLE_LETTER) {
			total += characterValue * 3;
		} else if (
			character.type === BonusType.DOUBLE_WORD ||
			character.type === BonusType.MIDDLE_SQUARE
		) {
			doubleWordBonuses++;
			total += characterValue;
		} else if (character.type === BonusType.TRIPLE_WORD) {
			tripleWordBonuses++;
			total += characterValue;
		} else if (character.type === BonusType.NONE) {
			total += characterValue;
		}
	}

	// console.log("Total: " + total);

	total *= 2 ** doubleWordBonuses;
	total *= 3 ** tripleWordBonuses;

	total += isBingo ? 50 : 0;
	// If the player players all the tiles in his rack on a single move, he scores a bingo (50 additional points to his total score)

	return total;
}

type Move = {
	startingSquare: Square;
	direction: Direction;
	length: number;
	rawScore: number; //score without the square bonuses (e.g double word and triple letter square bonuses)
	derivedScore: number; //score calculated with the square bonuses
	wordFormed: Word | Word[];
	isBingo: boolean;
};

type History = {
	move: Move;
	player: Turn;
	isFirstMove: boolean;
};

export class Scrabble {
	private _board = new Array<letter>(225);
	private _turn: Turn = PLAYER1;
	private _history: History[] = [];

	constructor() {}

	resetGame() {}

	addToHistory(move: Move, turn: Turn, isFirstMove: boolean) {
		this._history.push({
			move,
			player: turn,
			isFirstMove,
		});
	}

	makeMove(move: Move) {
		this.addToHistory(move, this._turn, this._history.length === 0 ? true : false);
		this._turn = swapTurns(this._turn);
	}

	turn() {
		return this._turn;
	}

	board() {
		const board = [];
		let row = [];

		for (let i = 0; i < this._board.length; i++) {
			if (this._board[i] == null) {
				row.push(null);
			} else {
				row.push({
					square: toSquare(boardRow(i), boardCol(i)),
					letter: this._board[i],
				});
			}

			if (((i + 1) % 15) % 1 === 0) {
				//checking if the current index is at the end of a row ( by checking if the index + 1 modulo 15 is a whole number)
				board.push(row);
				row = [];
			}
		}

		return board;
	}
}
