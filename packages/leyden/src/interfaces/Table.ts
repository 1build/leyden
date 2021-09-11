import { Element } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';

export interface Table {
    type: 'table';
    cols: number;
    rows: number;
    genColHeader?: (pos: number) => string;
    genRowHeader?: (pos: number) => string;
    children: Cell<CellType>[];
}

export const Table = {
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

    getNthCellCoords: (
        table: Table,
        n: number
    ): Coordinates => ({
        x: n % table.cols,
        y: Math.floor(n/table.cols),
    }),

    /**
     * Return true if a coordinate pair lies within the editor.
     */

    hasCoords: (
        table: Table,
        coords: Coordinates
    ): boolean => (
        coords.x<table.cols && coords.y<table.rows
    ),

    /**
     * Check if an element is a `Table`.
     */

    isTable: (el: Element): el is Table => (
        el.type === 'table'
    ),
};
