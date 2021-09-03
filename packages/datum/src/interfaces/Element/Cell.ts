import { Element } from 'slate';

import {
    ElementType,
    TypedElement,
} from '../../types';

export type Cell = TypedElement<ElementType.Cell>;

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     */

    isCell: (el: Element): el is Cell => (
        el.type === ElementType.Cell
    ),
};
