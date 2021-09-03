import { Direction2D } from '../types';

export interface Coordinates {
    x: number;
    y: number;
}

export const Coordinates = {
    /**
     * Get the coordinates reached by applying a direction to the provided coordinates.
     */

    move: (coords: Coordinates, direction: Direction2D): Coordinates => {
        const dirMap: Record<Direction2D, (coords: Coordinates) => Coordinates> = {
            [Direction2D.Up]: c => ({ ...c, y: c.y-1 }),
            [Direction2D.Right]: c => ({ ...c, x: c.x+1 }),
            [Direction2D.Down]: c => ({ ...c, y: c.y+1 }),
            [Direction2D.Left]: c => ({ ...c, x: c.x-1 }),
        };
        return dirMap[direction](coords);
    }
};
