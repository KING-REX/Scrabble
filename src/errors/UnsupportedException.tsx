export default class UnsupportedOperationException extends Error {
    public message: string;
    public name: string;
    public stack?: string | undefined;
    private statusCode: number = 400;

    constructor (message: string, stack?: string | undefined) {
        super(message);
        this.message = message;
        this.name = "Unsupported Operation";
        this.stack = stack;

        Object.setPrototypeOf(this, UnsupportedOperationException.prototype)
    }

    public getErrorMessage(): string {
        return `Unsupported operation: ${this.message}`;
    }
}