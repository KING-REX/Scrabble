import Challenge from "../challenge/Challenge";
import Player from "./Player";

export default class Human extends Player {
    constructor() {
        super();
    }

    public createChallenge(challengeTo: Player) {
        let createdChallenge = new Challenge(this, challengeTo);
        this.addRequestedChallenge(createdChallenge);
    }
}