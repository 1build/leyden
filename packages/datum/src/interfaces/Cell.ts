import { Element } from 'slate';

import { ExtendedType } from './CustomTypes';
import {
    ElementType,
    TypedElement,
} from '../types';

export type BaseCell = TypedElement<ElementType.Cell>;

export type Cell = ExtendedType<'Cell', BaseCell>;

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell => (
        el.type === ElementType.Cell
    ),
};
