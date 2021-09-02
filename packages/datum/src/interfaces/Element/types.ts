import { Descendant } from 'slate';

export enum ElementType {
    Cell,
    Selection,
    Sheet,
}

export interface TypedElement<T extends ElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

// If not pre-defined, `Element` imports from `slate` as `any` - possibly a circular issue?
export type DatumElement = TypedElement<ElementType, Descendant[]>;

export const DatumElement = {
};

// SheetHeaderFunc generates column/row header strings from their positition.
export type HeaderGenerator = Generator<string, void, undefined>;

export interface Coordinates {
    x: number;
    y: number;
}

export interface Window {
    topLeft: Coordinates;
    bottomRight: Coordinates;
}
