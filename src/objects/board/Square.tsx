enum SquareName {
    NONE = "",
    DOUBLE_LETTER = "",
    DOUBLE_WORD = "",
    TRIPLE_LETTER = "",
    TRIPLE_WORD = ""
}

export default class Square {
    private __width: number;
    private __height: number;

    constructor(__width?: number, __height?: number) {
        this.__width = __width ?? 0;
        this.__height = __height ?? 0;
    }

    public getWidth(): number {
        return this.__width;
    }

    public setWidth(width: number): void {
        this.__width = width;
    }

    public getHeight(): number {
        return this.__height;
    }

    public setHeight(height: number): void {
        this.__height = height;
    }
}