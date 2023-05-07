export default class UnsupportedException implements Error {
    public message: string;
    public name: string;
    public stack?: string | undefined;

    constructor (message?: string, stack?: string | undefined) {
        this.message = message ?? "Operation unsupported!";
        this.name = "Unsupported Exception";
        this.stack = stack;
    }
}