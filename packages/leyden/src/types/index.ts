export enum Direction2D {
    Up,
    Right,
    Down,
    Left,
}

/**
 * Distribute a type over its union.
 */
export type Distribute<T> =
    T extends T
        ? T
        : never;

/**
 * Produce a keys union of a record indexed by strings.
 */
export type Keys<T extends Record<string, unknown>> =
    Distribute<keyof T>;
