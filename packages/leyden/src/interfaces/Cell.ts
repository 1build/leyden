import { Element } from 'slate';

import { ExtendedCellType, ExtendedType } from './CustomTypes';
import { Keys } from '../types';

export type Cells = ExtendedType<'Cells'>;
export type CellType = Keys<Cells>;

export type Cell<T extends CellType> = ExtendedCellType<T, Cells>;

export const Cell = {
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
};
