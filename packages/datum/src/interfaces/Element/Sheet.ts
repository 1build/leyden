import { Element } from 'slate';

import { Cell } from './Cell';
import {
    ElementType,
    HeaderGenerator,
    TypedElement,
} from './types';

export interface Sheet extends TypedElement<ElementType.Sheet, Cell[]> {
    cols: number;
    rows: number;
    colHeaders?: HeaderGenerator;
    rowHeaders?: HeaderGenerator;
}

export const Sheet = {
    /**
     * Check if an element is a `Sheet`.
     */

    isSheet: (el: Element): el is Sheet => (
        el.type === ElementType.Sheet
    ),

    *genNumeric(): HeaderGenerator {
        let i = 1;
        while (true) {
            yield (i++).toString();
        }
    },
};
