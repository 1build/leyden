export interface Coordinates {
    x: number;
    y: number;
}

export type CoordinateTranslation = Partial<Coordinates>;

export interface CoordinatesInterface {
    equals: (coords: Coordinates, another: Coordinates) => boolean;
    move: (
        coords: Coordinates,
        direction: 'up'|'down'|'left'|'right'
    ) => Coordinates;
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

    move(
        coords: Coordinates,
        direction: 'up'|'down'|'left'|'right'
    ): Coordinates {
        const dirMap = {
            'up': (c: Coordinates) => ({ ...c, y: c.y-1 }),
            'right': (c: Coordinates) => ({ ...c, x: c.x+1 }),
            'down': (c: Coordinates) => ({ ...c, y: c.y+1 }),
            'left': (c: Coordinates) => ({ ...c, x: c.x-1 }),
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
