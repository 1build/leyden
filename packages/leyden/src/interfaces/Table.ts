import { Element } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';

export interface Table {
    type: 'table';
    isEditable?: true;
    columns: number;
    children: Cell<CellType>[];
}

export interface TableInterface {
    cell: (
        table: Table,
        options: {
            at: Coordinates;
        }
    ) => Cell<CellType>|null;
    cellIdx: (table: Table, coords: Coordinates) => number;
    cellOfType: <T extends CellType>(
        table: Table,
        type: T,
        options: {
            at: Coordinates;
        }
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
        options: {
            at: number,
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    columnOfType: <T extends CellType>(
        table: Table,
        type: T,
        options: {
            at: number,
            reverse?: boolean
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
    isTable: (el: Element) => el is Table;
    new: (columns: number, cells: Cell<CellType>[]) => Table;
    nthCell: (table: Table, n: number) => Cell<CellType>|null;
    nthCellCoords: (table: Table, n: number) => Coordinates;
    row: (
        table: Table,
        options: {
            at: number,
            reverse?: boolean
        }
    ) => Generator<TableCell, void, undefined>;
    rowOfType:  <T extends CellType>(
        table: Table,
        type: T,
        options: {
            at: number,
            reverse?: boolean
        }
    ) => Generator<TableCell<T>, void, undefined>;
}

export const Table: TableInterface = {
    /**
     * Get the cell at `coords` in a table.
     */

    cell(
        table: Table,
        options: {
            at: Coordinates;
        }
    ): Cell<CellType>|null {
        const { at } = options;
        if (at.y < 0 || at.x < 0 || at.x >= table.columns) {
            return null;
        }
        const { rows } = Table.dimensions(table);
        if (at.y >= rows) {
            return null;
        }
        const cellIdx = Table.cellIdx(table, at);
        return Table.nthCell(table, cellIdx);
    },

    /**
     * Get the index within a table's `children` specified by `coords`.
     */

    cellIdx(
        table: Table,
        coords: Coordinates,
    ): number {
        const idx = (coords.y*table.columns)+coords.x;
        if (idx < 0) {
            throw new Error(`Coordinates generate a negative cell index: ${coords} -> ${idx}`);
        }
        return idx;
    },

    /**
     * Get the cell at `coords` in an table, provided it is of the expected type.
     */

    cellOfType<T extends CellType>(
        table: Table,
        type: T,
        options: {
            at: Coordinates;
        }
    ): Cell<T>|null {
        const { at } = options;
        const cell = Table.cell(table, { at });
        if (cell !== null && Cell.isCellOfType(cell, type)) {
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
            if (Cell.isCellOfType(cell, type)) {
                yield [cell, coordinates];
            }
        }
    },

    /**
     * Iterate over all cells in a column.
     */

    *column(
        table: Table,
        options: {
            at: number,
            reverse?: boolean
        }
    ): Generator<TableCell, void, undefined> {
        const { at, reverse = false } = options;
        const { rows } = Table.dimensions(table);
        let coords = {
            x: at,
            y: reverse ? rows-1 : 0,
        };

        while (reverse ? coords.y >= 0 : coords.y < rows) {
            const cell = Table.cell(table, { at: coords });
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coords.x}, ${coords.y})`);
            }
            yield [cell, coords];
            coords = Coordinates.move(
                coords,
                reverse ? 'up' : 'down'
            );
        }
    },

    /**
     * Iterate over all cells of the specified type within a column.
     */

    *columnOfType<T extends CellType>(
        table: Table,
        type: T,
        options: {
            at: number,
            reverse?: boolean
        }
    ): Generator<TableCell<T>, void, undefined> {
        for (const [cell, coordinates] of Table.column(table, options)) {
            if (Cell.isCellOfType(cell, type)) {
                yield [cell, coordinates];
            }
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

    isTable(el: Element): el is Table {
        return el.type === 'table';
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
     * Iterate over all cells in a row.
     */

    *row(
        table: Table,
        options: {
            at: number,
            reverse?: boolean
        }
    ): Generator<TableCell, void, undefined> {
        const { at, reverse = false } = options;
        let coords = {
            x: reverse ? table.columns-1 : 0,
            y: at
        };

        while (reverse ? coords.x >= 0 : coords.x < table.columns) {
            const cell = Table.cell(table, { at: coords });
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coords.x}, ${coords.y})`);
            }
            yield [cell, coords];
            coords = Coordinates.move(
                coords,
                reverse ? 'left' : 'right'
            );
        }
    },

    /**
     * Iterate over all cells of the specified type within a row.
     */

    *rowOfType<T extends CellType>(
        table: Table,
        type: T,
        options: {
            at: number,
            reverse?: boolean
        }
    ): Generator<TableCell<T>, void, undefined> {
        for (const [cell, coordinates] of Table.row(table, options)) {
            if (Cell.isCellOfType(cell, type)) {
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

/**
 * `TableDimensions` objects specify the number of rows and columns in a table.
 */

export type TableDimensions = {
    columns: number;
    rows: number;
}
