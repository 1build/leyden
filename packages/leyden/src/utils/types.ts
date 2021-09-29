import { Operation } from 'slate';

import { Coordinates } from '../interfaces/Coordinates';
import { Cell, CellType } from '../interfaces/Cell';
import { ValidationFuncs, ValidatorIsExtended } from '../interfaces/Validator';

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
 * A function fired when a Slate operation is applied
 */

export type OperationSubscriber = (op: Operation) => void;

/**
 * A function fired when a cell's value changes.
 */

export type CellSubscriber<T extends CellType> = (cell: Cell<T>) => void;

/**
 * A function fired when the coordinates of the currently selected cell changes.
 */

export type SelectionSubscriber = (coords: Coordinates|null) => void;

/**
 * A function which will end a subscription 
 */

export type Unsubscriber = () => void;

/**
 * Initialization options for editor creation
 */

export type EditorCreationOptions = ValidatorIsExtended extends true
    ? { validators: ValidationFuncs }
    : { validators?: undefined };
