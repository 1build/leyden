import { Element } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';

export interface Table {
    type: 'table';
    isInline?: false;
    isVoid?: false;
    columns: number;
    children: Cell<CellType>[];
}

export interface TableInterface {
    cell: <T extends CellType>(
        table: Table,
        options: {
            at: Coordinates;
            type?: T,
        }
    ) => Cell<T>|null;
    cellIdx: (
        table: Table,
        options: {
            at: Coordinates
        }
    ) => number;
    cells: <T extends CellType=CellType>(
        table: Table,
        options?: {
            reverse?: boolean,
            type?: T
        }
    ) => Generator<TableCell<T>, void, undefined>;
    column: <T extends CellType=CellType>(
        table: Table,
        options: {
            at: number,
            reverse?: boolean,
            type?: T
        }
    ) => Generator<TableCell<T>, void, undefined>;
    dimensions: (
        table: Table
    ) => TableDimensions;
    hasCoords: (
        table: Table,
        options: {
            at: Coordinates;
        }
    ) => boolean;
    isTable: (element: Element) => element is Table;
    isTableLenient: (value: unknown) => value is Table;
    new: (
        columns: number,
        cells: Cell<CellType>[]
    ) => Table;
    nthCell: <T extends CellType=CellType>(
        table: Table,
        options: {
            at: number;
            type?: T,
        }
    ) => Cell<T>|null;
    nthCellCoords: (table: Table, n: number) => Coordinates;
    row: <T extends CellType=CellType>(
        table: Table,
        options: {
            at: number,
            reverse?: boolean,
            type?: T
        }
    ) => Generator<TableCell<T>, void, undefined>;
}

export const Table: TableInterface = {
    /**
     * Get the cell at `coords` in a table.
     */

    cell<T extends CellType>(
        table: Table,
        options: {
            at: Coordinates;
            type?: T,
        }
    ): Cell<T>|null {
        const { at, type } = options;
        if (at.y < 0 || at.x < 0 || at.x >= table.columns) {
            return null;
        }
        const { rows } = Table.dimensions(table);
        if (at.y >= rows) {
            return null;
        }
        const cellIdx = Table.cellIdx(table, { at });
        return Table.nthCell(table, { at: cellIdx, type });
    },

    /**
     * Get the index within a table's `children` specified by `coords`.
     */

    cellIdx(
        table: Table,
        options: {
            at: Coordinates
        }
    ): number {
        const { at } = options;
        const idx = (at.y*table.columns)+at.x;
        if (idx < 0) {
            throw new Error(`Coordinates generate a negative cell index: ${at} -> ${idx}`);
        }
        return idx;
    },

    /**
     * Iterate over all cells in an editor.
     */

    *cells<T extends CellType=CellType>(
        table: Table,
        options: {
            reverse?: boolean
            type?: T
        } = {}
    ): Generator<TableCell<T>, void, undefined> {
        const { reverse = false, type } = options;
        const { children: cells } = table;
        let index = reverse ? cells.length-1 : 0;

        while (reverse ? index >= 0 : index < cells.length) {
            const cell = cells[index];
            if (Cell.isCell(cell, { type })) {
                const cellCoords = Table.nthCellCoords(table, index);
                yield [cell, cellCoords];
            }
            index = reverse ? index-1 : index+1;
        }
    },

    /**
     * Iterate over all cells in a column.
     */

    *column<T extends CellType=CellType>(
        table: Table,
        options: {
            at: number,
            reverse?: boolean
            type?: T
        }
    ): Generator<TableCell<T>, void, undefined> {
        const { at, reverse = false, type } = options;
        const { rows } = Table.dimensions(table);
        let coords = {
            x: at,
            y: reverse ? rows-1 : 0,
        };

        while (reverse ? coords.y >= 0 : coords.y < rows) {
            const cell = Table.cell(table, { at: coords });
            if (cell !== null && Cell.isCell(cell, { type })) {
                yield [cell, coords];
            }
            coords = Coordinates.move(
                coords,
                reverse ? 'up' : 'down'
            );
        }
    },

    /**
     * Return the passed table's dimensions.
     * Unfilled final rows are not included in the returned `rows` value.
     */

    dimensions(table: Table): TableDimensions {
        return {
            columns: table.columns,
            rows: Math.floor(table.children.length/table.columns)
        };
    },

    /**
     * Return true if a coordinate pair lies within the editor.
     */

    hasCoords(
        table: Table,
        options: {
            at: Coordinates;
        }
    ): boolean {
        const { at } = options;
        const { columns, rows } = Table.dimensions(table);
        return at.x<columns && at.y<rows;
    },

    /**
     * Check if an element is a `Table`.
     */

    isTable(element: Element): element is Table {
        return element.type === 'table';
    },

    /**
     * Check if an unknown value is a `Table`.
     * This is a more broad and therefore less performant `isTable` variation.
     */

    isTableLenient(value: unknown): value is Table {
        return Element.isElement(value) && Table.isTable(value);
    },

    /**
     * Create a Leyden table.
     */

    new(columns: number, cells: Cell<CellType>[]): Table {
        return {
            type: 'table',
            columns,
            children: cells,
        };
    },

    /**
     * Get a table's `n`th cell.
     */

    nthCell<T extends CellType=CellType>(
        table: Table,
        options: {
            at: number;
            type?: T,
        }
    ): Cell<T>|null {
        const { at, type } = options;
        if (table.children.length <= at) {
            return null;
        }
        const cell = table.children[at];
        if (!cell) {
            return null;
        }
        if (Cell.isCell(cell, { type })) {
            return cell;
        }
        return null;
    },

    /**
     * Get the coordinates of the cell at the nth position of the flat cell list.
     */

    nthCellCoords(
        table: Table,
        n: number
    ): Coordinates {
        return {
            x: n % table.columns,
            y: Math.floor(n/table.columns),
        };
    },

    /**
     * Iterate over cells in a row.
     */

    *row<T extends CellType=CellType>(
        table: Table,
        options: {
            at: number,
            reverse?: boolean,
            type?: T
        }
    ): Generator<TableCell<T>, void, undefined> {
        const { at, reverse = false, type } = options;
        let coords = {
            x: reverse ? table.columns-1 : 0,
            y: at
        };

        while (reverse ? coords.x >= 0 : coords.x < table.columns) {
            const cell = Table.cell(table, { at: coords });
            if (cell !== null && Cell.isCell(cell, { type })) {
                yield [cell, coords];
            }
            coords = Coordinates.move(
                coords,
                reverse ? 'left' : 'right'
            );
        }
    },
};

/**
 * `TableCell` objects are returned when iterating over the cells of a table.
 * They consist of the cell and its `Coordinates` relative to the table.
 */

export type TableCell<T extends CellType=CellType> = [Cell<T>, Coordinates];

/**
 * `TableDimensions` objects specify the number of rows and columns in a table.
 */

export type TableDimensions = {
    columns: number;
    rows: number;
}
