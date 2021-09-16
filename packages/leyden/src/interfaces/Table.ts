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

export interface TableInterface {
    cells: (
        table: Table,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    getNthCell: (table: Table, n: number) => Cell<CellType>|null;
    getCellAtCoords: (table: Table, coords: Coordinates) => Cell<CellType>|null;
    getCellIdx: (table: Table, coords: Coordinates) => number;
    getNthCellCoords: (table: Table, n: number) => Coordinates;
    hasCoords: (table: Table, coords: Coordinates) => boolean;
    isTable: (el: Element) => el is Table;
}

export const Table: TableInterface = {
    /**
     * Iterate over all cells in a table.
     */

    *cells(
        table: Table,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<TableCell, void, undefined> {
        const { reverse = false } = options;
        const { children: cells } = table;
        let index = reverse ? cells.length-1 : 0;

        while (reverse ? index >= 0 : index < cells.length) {
            const cell = cells[index];
            const cellCoords = Table.getNthCellCoords(table, index);
            yield [cell, cellCoords];
            index = reverse ? index-1 : index+1;
        }
    },

    /**
     * Get a table's `n`th cell.
     */

    getNthCell(
        table: Table,
        n: number
    ): Cell<CellType>|null {
        if (table.children.length <= n) {
            return null;
        }
        return table.children[n];
    },

    /**
     * Get the cell at `coords` in a table.
     */

    getCellAtCoords (
        table: Table,
        coords: Coordinates,
    ): Cell<CellType>|null {
        const cellIdx = Table.getCellIdx(table, coords);
        return Table.getNthCell(table, cellIdx);
    },

    /**
     * Get the index within a table's `children` specified by `coords`.
     */

    getCellIdx (
        table: Table,
        coords: Coordinates,
    ): number {
        return (coords.y*table.cols)+coords.x;
    },

    /**
     * Get the coordinates of the cell at the nth position of the flat cell list.
     */

    getNthCellCoords (
        table: Table,
        n: number
    ): Coordinates {
        return {
            x: n % table.cols,
            y: Math.floor(n/table.cols),
        };
    },

    /**
     * Return true if a coordinate pair lies within the editor.
     */

    hasCoords (
        table: Table,
        coords: Coordinates
    ): boolean {
        return coords.x<table.cols && coords.y<table.rows;
    },

    /**
     * Check if an element is a `Table`.
     */

    isTable (el: Element): el is Table {
        return el.type === 'table';
    },
};

/**
 * `TableCell` objects are returned when iterating over the cells of a table.
 * They consist of the cell and its `Coordinates` relative to the table.
 */

export type TableCell = [Cell<CellType>, Coordinates];
