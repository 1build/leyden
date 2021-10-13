import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';

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
        options: {
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
        const { columns } = LeydenEditor.table(editor);
        if (columns < 1) {
            return;
        }
        const rowsBottomFirst = [...at].sort((a, b) => b - a);
        rowsBottomFirst.forEach(row => {
            Transforms.removeNodes(editor, {
                at: LeydenEditor.rowRange(editor, { at: row }),
            });
        });
    },

    /**
     * Insert rows.
     */

    insertRows(
        editor: Editor,
        cells: Cell<CellType>[],
        options: {
            at: number,
            position?: 'above'|'below'
        },
    ): void {
        const { at, position = 'above' } = options;

        const table = LeydenEditor.table(editor);
        const hangingCells = cells.length%table.columns;
        if (hangingCells !== 0) {
            throw new Error(`failed to insert row, (${cells.length} cells cannot make rows of ${table.columns})`);
        }

        let insertionCoords = { x: 0, y: at };
        if (position === 'below') {
            insertionCoords = Coordinates.move(insertionCoords, 'down');
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
        const rowRange = LeydenEditor.rowRange(editor, { at });
        Transforms.moveNodes(editor, { at: rowRange, to: insertionPath });
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
