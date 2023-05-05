export default class UnsupportedException implements Error {
    public message: string;
    public name: string;
    public stack?: string | undefined;

    constructor (message?: string, name?: string, stack?: string | undefined) {
        this.message = message ?? "Operation unsupported!";
        this.name = name ?? "Unsupported Exception";
        this.stack = stack;
    }
}