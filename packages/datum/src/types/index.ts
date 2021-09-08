import { Descendant } from 'slate';

export * from './math';

export enum ElementType {
    Cell,
    Selection,
    Sheet,
}

export interface TypedElement<T extends ElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

export enum Direction2D {
    Up,
    Right,
    Down,
    Left,
}
