import { Operation } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';

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

/**
 * A function fired when a cell's value changes.
 */
export type CellSubscriber = <T extends CellType>(cell: Cell<T>) => void;

/**
 * A function fired when a Slate operation is applied
 */
export type OperationSubscriber = (op: Operation) => void;

/**
 * A function which will end a subscription 
 */
export type Unsubscriber = () => void;
