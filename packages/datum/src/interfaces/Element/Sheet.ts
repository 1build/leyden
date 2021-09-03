import { Element, Path } from 'slate';

import { Cell } from './Cell';
import { Coordinates } from '../Coordinates';
import { ElementType, TypedElement } from '../../types';

export interface Sheet extends TypedElement<ElementType.Sheet, Cell[]> {
    cols: number;
    rows: number;
    genColHeader?: (pos: number) => string;
    genRowHeader?: (pos: number) => string;
}

export const Sheet = {
    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordPath: (sheet: Sheet, coords: Coordinates): Path => ([
        0, (coords.y*sheet.cols)+coords.x
    ]),

    /**
     * Generate an alphabetic column/row header from its 0-indexed position.
     */

    genAlphabeticHeader: (pos: number): string => {
        const positionBase26 = pos.toString(26);
        let label = '';
        for (let i = 0; i < positionBase26.length; i++) {
            const originalCharCode = positionBase26.charCodeAt(i);
            let adjustedCharCode: number;
            if (originalCharCode <= 57) {
                adjustedCharCode = originalCharCode + 17;
            } else {
                adjustedCharCode = originalCharCode - 22;
            }
            if (i < positionBase26.length-1) {
                adjustedCharCode -= 1;
            }
            label = `${label}${String.fromCharCode(adjustedCharCode)}`;
        }
        return label;
    },

    /**
     * Generate a numeric column/row header from its 0-indexed position.
     */

    genNumericHeader: (pos: number): string => (
        (pos+1).toString(10)
    ),

    /**
     * Get the coordinates of the cell at the nth position of the flat cell list.
     */

    getNthCellCoords: (sheet: Sheet, n: number): Coordinates => ({
        x: n % sheet.cols,
        y: Math.floor(n/sheet.cols),
    }),

    /**
     * Return true if a coordinate pair lies within the provided sheet.
     */

    hasCoords: (sheet: Sheet, coords: Coordinates): boolean => (
        coords.x<sheet.cols && coords.y<sheet.rows
    ),

    /**
     * Check if an element is a `Sheet`.
     */

    isSheet: (el: Element): el is Sheet => (
        el.type === ElementType.Sheet
    ),
};
