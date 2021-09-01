import { Element } from 'slate';

import { Cell } from './Cell';
import { ElementType, TypedElement } from './types';

export interface Sheet extends TypedElement<ElementType.Sheet, Cell[]> {
    cols: number;
    rows: number;
}

export const Sheet = {
    /**
     * Check if an element is a `Sheet`.
     */

    isSheet: (el: Element): el is Sheet => (
        el.type === ElementType.Sheet
    ),
};
