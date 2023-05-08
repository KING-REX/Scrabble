import Player from "../player/Player";

export enum GameType {
    HumanVHuman,
    HumanVAI,
    AIVAI,
    HumanVSelf,
}

export default class Game {

    private __gameType: GameType;
    private __player1: Player;
    private __player2: Player;

    constructor(gameType: GameType, player1: Player, player2: Player) {
        this.__gameType = gameType;
        this.__player1 = player1;
        this.__player2 = player2;
    }

    public start() {}

    public getGameType(): GameType {
        return this.__gameType;
    }

    public setGameType(gameType: GameType): void {
        this.__gameType = gameType;
    }

    public getPlayer1(): Player {
        return this.__player1;
    }

    public setPlayer1(player1: Player): void {
        this.__player1 = player1;
    }

    public getPlayer2(): Player {
        return this.__player2;
    }

    public setPlayer2(player2: Player): void {
        this.__player2 = player2;
    }
}