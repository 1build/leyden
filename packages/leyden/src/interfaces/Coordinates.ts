import { Direction2D } from '../utils/types';

export interface Coordinates {
    x: number;
    y: number;
}

export type CoordinateTranslation = Partial<Coordinates>;

export interface CoordinatesInterface {
    equals: (coords: Coordinates, another: Coordinates) => boolean;
    move: (coords: Coordinates, direction: Direction2D) => Coordinates;
    translate: (
        coords: Coordinates,
        translation: CoordinateTranslation,
    ) => Coordinates;
}

export const Coordinates: CoordinatesInterface = {
    /**
     * Return true if two sets of coordinates point to the same location.
     */

    equals(coords: Coordinates, another: Coordinates): boolean {
        return coords.x === another.x && coords.y === another.y;
    },

    /**
     * Get the coordinates reached by applying a direction to the provided coordinates.
     */

    move(coords: Coordinates, direction: Direction2D): Coordinates {
        const dirMap: Record<Direction2D, (coords: Coordinates) => Coordinates> = {
            [Direction2D.Up]: c => ({ ...c, y: c.y-1 }),
            [Direction2D.Right]: c => ({ ...c, x: c.x+1 }),
            [Direction2D.Down]: c => ({ ...c, y: c.y+1 }),
            [Direction2D.Left]: c => ({ ...c, x: c.x-1 }),
        };
        return dirMap[direction](coords);
    },

    /**
     * Get the coordinates reached by applying a transformation to the provided coordinates.
     */

    translate(
        coords: Coordinates,
        translation: CoordinateTranslation,
    ): Coordinates {
        return {
            x: coords.x+(translation.x??0),
            y: coords.y+(translation.y??0),
        };
    }
};
