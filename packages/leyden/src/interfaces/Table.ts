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
     * Get a table's `n`th cell.
     */

    getNthCell: (
        table: Table,
        n: number
    ): Cell<CellType>|null => {
        if (table.children.length <= n) {
            return null;
        }
        return table.children[n];
    },

    /**
     * Get the cell at `coords` in a table.
     */

    getCellAtCoords: (
        table: Table,
        coords: Coordinates,
    ): Cell<CellType>|null => {
        const cellIdx = Table.getCellIdx(table, coords);
        return Table.getNthCell(table, cellIdx);
    },

    /**
     * Get the index within a table's `children` specified by `coords`.
     */

    getCellIdx: (
        table: Table,
        coords: Coordinates,
    ): number => (
        (coords.y*table.cols)+coords.x
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
