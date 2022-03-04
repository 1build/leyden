import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Table } from '../interfaces/Table';

export interface TableTransforms {
    deleteRows: (
        editor: Editor,
        options: {
            at: Set<number>,
        }
    ) => void;
    insertRows: (
        editor: Editor,
        cells: Cell<CellType>[],
        options?: {
            at: number,
            position?: 'above'|'below'
        },
    ) => void;
    moveRow: (
        editor: Editor,
        options: {
            at: number,
            to: number,
        },
    ) => void;
    swapRows: (
        editor: Editor,
        options: {
            a: number,
            b: number,
        },
    ) => void;
}

export const TableTransforms: TableTransforms = {
    /**
     * Delete rows.
     */

    deleteRows(
        editor: Editor,
        options: {
            at: Set<number>,
        }
    ): void {
        const { at } = options;
        Transforms.removeNodes(editor, {
            at: LeydenEditor.tablePath(),
            mode: 'highest',
            match: (_, path) => {
                const coords = LeydenEditor.pathCoords(editor, path);
                return coords !== null && at.has(coords.y);
            },
        });
    },

    /**
     * Insert rows.
     * If options are not passed, rows are inserted at the bottom.
     */

    insertRows(
        editor: Editor,
        cells: Cell<CellType>[],
        options?: {
            at: number,
            position?: 'above'|'below'
        },
    ): void {
        const table = LeydenEditor.table(editor);
        const hangingCells = cells.length%table.columns;
        if (hangingCells !== 0) {
            throw new Error(`failed to insert row, (${cells.length} cells cannot make rows of ${table.columns})`);
        }

        let insertionCoords: Coordinates;
        if (options) {
            const { at, position = 'above' } = options;

            insertionCoords = { x: 0, y: at };
            if (position === 'below') {
                insertionCoords = Coordinates.move(insertionCoords, 'down');
            }
        } else {
            insertionCoords = { x: 0, y: Table.dimensions(LeydenEditor.table(editor)).rows };
        }

        const insertionPath = LeydenEditor.cellPath(editor, { at: insertionCoords });
        Transforms.insertNodes(editor, cells, { at: insertionPath });
    },

    /**
     * Move a row to another position.
     */

    moveRow(
        editor: Editor,
        options: {
            at: number,
            to: number,
        },
    ): void {
        const { at, to } = options;
        if (at === to) {
            return;
        }
        // When moving a row upwards, insert from the end of the target to account for the
        // upward shift of rows between the target and the source.
        const { columns } = LeydenEditor.table(editor);
        const insertionCoords = {
            x: to < at ? 0 : columns-1,
            y: to,
        };
        const insertionPath = LeydenEditor.cellPath(editor, { at: insertionCoords });
        Transforms.moveNodes(editor, {
            at: LeydenEditor.tablePath(),
            mode: 'highest',
            match: (_, path) => {
                const coords = LeydenEditor.pathCoords(editor, path);
                return coords !== null && coords.y === at;
            },
            to: insertionPath
        });
    },

    /**
     * Swap the positions of two rows.
     */

    swapRows(
        editor: Editor,
        options: {
            a: number,
            b: number,
        },
    ): void {
        const { a, b } = options;
        if (a === b) {
            return;
        }
        Editor.withoutNormalizing(editor, () => {
            const rowsToSwap = a > b
                ? { top: b, bottom: a }
                : { top: a, bottom: b };
            TableTransforms.moveRow(editor, {
                at: rowsToSwap.top,
                to: rowsToSwap.bottom,
            });
            TableTransforms.moveRow(editor, {
                at: rowsToSwap.bottom-1,
                to: rowsToSwap.top,
            });
        });
    },
};
