import Player from "../player/Player";

export default class Challenge {
    private __challengeFrom: Player;
    private __challengeTo: Player;
    private __dateInitiated: Date;
    private __challengeAccepted: boolean;

    constructor(challengeFrom: Player, challengeTo: Player){
        this.__challengeFrom = challengeFrom;
        this.__challengeTo = challengeTo;
        this.__dateInitiated = new Date();
        this.__challengeAccepted = false;
    }
}