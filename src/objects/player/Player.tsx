import ChallengeNotFoundException from "../../errors/ChallengeNotFoundException";
import Challenge from "../challenge/Challenge";
import Game from "../game/Game";

export default class Player {
    private __score: number = 0;
    private __bestWord = null;
    private __longestWord = null;
    private __bestGame = null;
    private __totalWins = 0;
    private __totalLosses = 0;
    private __longestWinStreak = 0;
    private __currentWinStreak = 0;
    private __ongoingGames: Game[];
    private __unacceptedChallenges: Challenge[];
    private __requestedChallenges: Challenge[]

    constructor() {
        this.__ongoingGames = new Array<Game>(0);
        this.__unacceptedChallenges = new Array<Challenge>(0);
        this.__requestedChallenges = new Array<Challenge>(0);
    }

    private addGameToOngoingGames(game: Game): void {
        this.__ongoingGames.push(game);
    }

    public startedGame(game: Game): void {
        this.addGameToOngoingGames(game);
    }

    public addUnacceptedChallenge(challenge: Challenge) {
        this.__unacceptedChallenges.push(challenge);
    }

    public addRequestedChallenge(challenge: Challenge) {
        this.__requestedChallenges.push(challenge);
    }

    public acceptChallenge(challenge: Challenge) {
        if(!this.__unacceptedChallenges.includes(challenge))
            throw new ChallengeNotFoundException("Selected challenge not found!");
        this.__unacceptedChallenges.splice(this.__unacceptedChallenges.indexOf(challenge), 1);
    }
}