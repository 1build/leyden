import { Element, ElementType } from './Element';
import { ExtendedCellType, ExtendedType } from './CustomTypes';
import { Keys } from '../types';

export type Cells = ExtendedType<'Cells'>;
export type CellType = Keys<Cells>;

export type Cell<T extends CellType> = ExtendedCellType<T, Cells>;

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element<ElementType>): el is Element<CellType> => (
        el.type === 'cell'
    ),
};
