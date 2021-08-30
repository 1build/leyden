import { Descendant } from 'slate';

export enum ElementType {
    Cell,
    Row,
    Selection,
    Table,
}

export interface DatumElement<T extends ElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

// If not pre-defined, `Element` imports from `slate` as `any` - possibly a circular issue?
export type SlateDatumElement = DatumElement<ElementType, Descendant[]>;

export const DatumElement = {
};

export interface Coordinates {
    x: number;
    y: number;
}

export interface Window {
    topLeft: Coordinates;
    bottomRight: Coordinates;
}
