import { Descendant, Element, Text } from 'slate';

import { ExtendedType } from './CustomTypes';
import {
    Distribute,
    ElementType,
    TypedElement,
} from '../types';

export interface DatumCell<T extends string> {
    cellType: T,
}

export type BaseCells = {
    default: [Text];
}

export type Cells =
    ExtendedType<'Cells', BaseCells> extends infer U
        ? U extends Record<string, Descendant[]>
            ? U
            : BaseCells
        : BaseCells;

export type CellType = Distribute<keyof Cells>;

export type CellChildren<T extends CellType> = Cells[T];

export interface Cell<T extends CellType> extends TypedElement<ElementType.Cell, CellChildren<T>> {
    cellType: T;
}

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell<CellType> => (
        el.type === ElementType.Cell
    ),
};
