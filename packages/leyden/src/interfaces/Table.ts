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
    dimensions: (table: Table) => TableDimensions;
    hasCoords: (table: Table, coords: Coordinates) => boolean;
    isTable: (el: Element) => el is Table;
    new: (columns: number, cells: Cell<CellType>[]) => Table;
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

    cell(
        table: Table,
        coords: Coordinates,
    ): Cell<CellType>|null {
        if (coords.y < 0 || coords.x < 0 || coords.x >= table.columns) {
            return null;
        }
        const { rows } = Table.dimensions(table);
        if (coords.y >= rows) {
            return null;
        }
        const cellIdx = Table.cellIdx(table, coords);
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
        const { rows } = Table.dimensions(table);
        let coordinates = {
            x: column,
            y: reverse ? rows-1 : 0,
        };

        while (reverse ? coordinates.y >= 0 : coordinates.y < rows) {
            const cell = Table.cell(table, coordinates);
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coordinates.x}, ${coordinates.y})`);
            }
            yield [cell, coordinates];
            coordinates = Coordinates.move(
                coordinates,
                reverse ? 'up' : 'down'
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
        coords: Coordinates
    ): boolean {
        const { columns, rows } = Table.dimensions(table);
        return coords.x<columns && coords.y<rows;
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
        row: number,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<TableCell, void, undefined> {
        const { reverse = false } = options;
        let coordinates = {
            x: reverse ? table.columns-1 : 0,
            y: row
        };

        while (reverse ? coordinates.x >= 0 : coordinates.x < table.columns) {
            const cell = Table.cell(table, coordinates);
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coordinates.x}, ${coordinates.y})`);
            }
            yield [cell, coordinates];
            coordinates = Coordinates.move(
                coordinates,
                reverse ? 'left' : 'right'
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

/**
 * `TableDimensions` objects specify the number of rows and columns in a table.
 */

export type TableDimensions = {
    columns: number;
    rows: number;
}
