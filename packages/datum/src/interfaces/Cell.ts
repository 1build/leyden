import { Element } from 'slate';

import { ExtendedType } from './CustomTypes';
import {
    Distribute,
    ElementType,
    TypedElement,
} from '../types';

export interface DatumCell<T extends string> {
    cellType: T,
}

export type BaseCellData = {
    default: null;
}

export type CellData =
    ExtendedType<'CellData', BaseCellData> extends infer U
        ? U extends Record<string, unknown>
            ? U
            : BaseCellData
        : BaseCellData;

export type CellType = Distribute<keyof CellData>;

export interface Cell<T extends CellType> extends TypedElement<ElementType.Cell> {
    cellType: T;
    data: CellData[T];
}

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell<CellType> => (
        el.type === ElementType.Cell
    ),

    /**
     * Check if a cell is specific cell type.
     */

    cellIs: <T extends CellType>(
        cell: Cell<CellType>,
        cellType: T,
    ): cell is Cell<T> => (
        cell.cellType === cellType
    ),
};
