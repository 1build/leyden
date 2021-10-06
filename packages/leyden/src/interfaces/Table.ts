import { Element } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';
import { Direction2D } from '../utils/types';

export interface Table {
    type: 'table';
    isEditable?: true;
    cols: number;
    rows: number;
    children: Cell<CellType>[];
}

export interface TableInterface {
    cell: (table: Table, coords: Coordinates) => Cell<CellType>|null;
    cellIdx: (table: Table, coords: Coordinates) => number;
    cellOfType: <T extends CellType>(
        table: Table,
        coords: Coordinates,
        type: T
    ) => Cell<T>|null;
    cells: (
        table: Table,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    cellsOfType: <T extends CellType>(
        table: Table,
        type: T,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    column: (
        table: Table,
        column: number,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    columnOfType: <T extends CellType>(
        table: Table,
        column: number,
        type: T,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell<T>, void, undefined>;
    hasCoords: (table: Table, coords: Coordinates) => boolean;
    isTable: (el: Element) => el is Table;
    new: (cols: number, rows: number, cells: Cell<CellType>[]) => Table;
    nthCell: (table: Table, n: number) => Cell<CellType>|null;
    nthCellCoords: (table: Table, n: number) => Coordinates;
    row: (
        table: Table,
        row: number,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    rowOfType:  <T extends CellType>(
        table: Table,
        row: number,
        type: T,
        options?: {
            reverse?: boolean
        }
    ) => Generator<TableCell<T>, void, undefined>;
}

export const Table: TableInterface = {
    /**
     * Get the cell at `coords` in a table.
     */

    cell (
        table: Table,
        coords: Coordinates,
    ): Cell<CellType>|null {
        const cellIdx = Table.cellIdx(table, coords);
        return Table.nthCell(table, cellIdx);
    },

    /**
     * Get the index within a table's `children` specified by `coords`.
     */

    cellIdx (
        table: Table,
        coords: Coordinates,
    ): number {
        return (coords.y*table.cols)+coords.x;
    },

    /**
     * Get the cell at `coords` in an table, provided it is of the expected type.
     */

    cellOfType<T extends CellType>(
        table: Table,
        coords: Coordinates,
        type: T
    ): Cell<T>|null {
        const cell = Table.cell(table, coords);
        if (cell !== null && Cell.isCellType(cell, type)) {
            return cell;
        }
        return null;
    },


    /**
     * Iterate over all cells in an editor.
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
            const cellCoords = Table.nthCellCoords(table, index);
            yield [cell, cellCoords];
            index = reverse ? index-1 : index+1;
        }
    },

    /**
     * Iterate over all cells of the specified type.
     */

    *cellsOfType<T extends CellType>(
        table: Table,
        type: T,
        options?: {
            reverse?: boolean
        }
    ): Generator<TableCell<T>, void, undefined> {
        for (const [cell, coordinates] of Table.cells(table, options)) {
            if (Cell.isCellType(cell, type)) {
                yield [cell, coordinates];
            }
        }
    },

    /**
     * Iterate over all cells in a column.
     */

    *column(
        table: Table,
        column: number,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<TableCell, void, undefined> {
        const { reverse = false } = options;
        let coordinates = {
            x: column,
            y: reverse ? table.rows-1 : 0,
        };

        while (reverse ? coordinates.y >= 0 : coordinates.y < table.rows) {
            const cell = Table.cell(table, coordinates);
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coordinates.x}, ${coordinates.y})`);
            }
            yield [cell, coordinates];
            coordinates = Coordinates.move(
                coordinates,
                reverse ? Direction2D.Up : Direction2D.Down
            );
        }
    },

    /**
     * Iterate over all cells of the specified type within a column.
     */

    *columnOfType<T extends CellType>(
        table: Table,
        column: number,
        type: T,
        options?: {
            reverse?: boolean
        }
    ): Generator<TableCell<T>, void, undefined> {
        for (const [cell, coordinates] of Table.column(table, column, options)) {
            if (Cell.isCellType(cell, type)) {
                yield [cell, coordinates];
            }
        }
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

    isTable(el: Element): el is Table {
        return el.type === 'table';
    },

    new(cols: number, rows: number, cells: Cell<CellType>[]): Table {
        return {
            type: 'table',
            cols,
            rows,
            children: cells,
        };
    },

    /**
     * Get a table's `n`th cell.
     */

    nthCell(
        table: Table,
        n: number
    ): Cell<CellType>|null {
        if (table.children.length <= n) {
            return null;
        }
        return table.children[n];
    },

    /**
     * Get the coordinates of the cell at the nth position of the flat cell list.
     */

    nthCellCoords (
        table: Table,
        n: number
    ): Coordinates {
        return {
            x: n % table.cols,
            y: Math.floor(n/table.cols),
        };
    },

    /**
     * Iterate over all cells in a row.
     */

    *row(
        table: Table,
        row: number,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<TableCell, void, undefined> {
        const { reverse = false } = options;
        let coordinates = {
            x: reverse ? table.cols-1 : 0,
            y: row
        };

        while (reverse ? coordinates.x >= 0 : coordinates.x < table.cols) {
            const cell = Table.cell(table, coordinates);
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coordinates.x}, ${coordinates.y})`);
            }
            yield [cell, coordinates];
            coordinates = Coordinates.move(
                coordinates,
                reverse ? Direction2D.Left : Direction2D.Right
            );
        }
    },

    /**
     * Iterate over all cells of the specified type within a row.
     */

    *rowOfType<T extends CellType>(
        table: Table,
        row: number,
        type: T,
        options?: {
            reverse?: boolean
        }
    ): Generator<TableCell<T>, void, undefined> {
        for (const [cell, coordinates] of Table.row(table, row, options)) {
            if (Cell.isCellType(cell, type)) {
                yield [cell, coordinates];
            }
        }
    },
};

/**
 * `TableCell` objects are returned when iterating over the cells of a table.
 * They consist of the cell and its `Coordinates` relative to the table.
 */

export type TableCell<T extends CellType=CellType> = [Cell<T>, Coordinates];
