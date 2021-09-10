import { Descendant } from 'slate';

export * from './math';

export enum ChalkboardElementType {
    Cell,
    Element,
    Sheet,
}

export interface TypedElement<T extends ChalkboardElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

export type ChalkboardElement = TypedElement<ChalkboardElementType, Descendant[]>;

export interface TypedText<T extends string> {
    text: T;
}

export type ChalkboardText = TypedText<string>;

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
