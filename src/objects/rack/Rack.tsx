import Stack from "../stack/Stack";
import Tile from "../tile/Tile";

type RackTile = Tile | null;

export default class Rack {
    private __tiles: RackTile[];
    private static LENGTH: number = 7;

    constructor() {
        this.__tiles = new Array(Rack.LENGTH);
        this.__tiles.fill(null);
    }

    public getTiles(): RackTile[] {
        return this.__tiles;
    }

    public addTile(tile: Tile): void {
        if(this.__tiles.length < Rack.LENGTH)
            this.__tiles.push(tile);
    }

    public removeTile(index: number): void {
        this.__tiles.splice(index, 1, null);
    }

    public populate(stack: Stack): void {
        
    }
}