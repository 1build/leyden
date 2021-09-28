import { Element } from 'slate';

import { ExtendedCellType, ExtendedType } from './CustomTypes';
import { Keys } from '../utils/types';

export type Cells = ExtendedType<'Cells'>;
export type CellType = Keys<Cells>;

export type Cell<T extends CellType> = ExtendedCellType<T, Cells>;

export interface CellInterface {
    isCell: (el: Element) => el is Cell<CellType>;
    isCellList: (els: Element[]) => els is Cell<CellType>[];
    isCellType: <T extends CellType>(cell: Cell<CellType>, type: T) => cell is Cell<T>;
}

export const Cell: CellInterface = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell<CellType> => (
        el.type === 'cell'
    ),

    /**
     * Check if a list of elements are all of type `Cell`.
     */

    isCellList: (value: Element[]): value is Cell<CellType>[] => (
        Array.isArray(value) && value.every(val => Cell.isCell(val))
    ),

    /**
     * Check if a cell is a specific cell type.
     */

    isCellType: <T extends CellType>(
        cell: Cell<CellType>,
        type: T
    ): cell is Cell<T> => (
        cell.cellType === type
    ),
};
