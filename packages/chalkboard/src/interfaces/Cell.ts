import { Element } from 'slate';

import { ExtendedElementType, ExtendedType } from './CustomTypes';
import { ChalkboardElementType, Keys } from '../types';

export type Cells = ExtendedType<'Cells'>;
export type CellType = Keys<Cells>;
export type Cell<T extends CellType> = ExtendedElementType<ChalkboardElementType.Cell, T, Cells>;

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell<CellType> => (
        el.type === ChalkboardElementType.Cell
    ),
};
