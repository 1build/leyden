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

type AllCellData =
    ExtendedType<'CellData', BaseCellData> extends infer U
        ? U extends Record<string, unknown>
            ? U
            : BaseCellData
        : BaseCellData;

export type CellType = Distribute<keyof AllCellData>;

export type CellData<T extends CellType> = AllCellData[T];

export interface Cell<T extends CellType> extends TypedElement<ElementType.Cell> {
    cellType: T;
    data: CellData<T>;
}

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell<CellType> => (
        el.type === ElementType.Cell
    ),
};
