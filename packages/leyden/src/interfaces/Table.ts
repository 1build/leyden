import { Element } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';

export interface Table {
    type: 'table';
    isEditable?: true;
    cols: number;
    rows: number;
    children: Cell<CellType>[];
}

export const Table = {
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
