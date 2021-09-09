import { Element } from 'slate';

import { ExtendedType } from './CustomTypes';
import {
    DatumElementType,
    Keys,
    TypedElement,
} from '../types';

export type Cells = ExtendedType<'Cells'>;
export type CellType = Keys<Cells>;
export interface Cell<T extends CellType> extends TypedElement<DatumElementType.Cell, Cells[T]['children']> {
    subType: T;
    data: Cells[T]['data'];
}

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell<CellType> => (
        el.type === DatumElementType.Cell
    ),
};
