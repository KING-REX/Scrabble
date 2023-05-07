export default class ChallengeNotFoundException implements Error {
    public message: string;
    public name: string;
    public stack?: string | undefined;

    constructor (message?: string, stack?: string | undefined) {
        this.message = message ?? "Challenge not found!";
        this.name = "Challenge Not Found Exception";
        this.stack = stack;
    }
}