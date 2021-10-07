import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Direction2D } from '../utils/types';

export interface TableTransforms {
    deleteRows: (
        editor: Editor,
        options?: {
            at?: Set<number>,
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
}

export const TableTransforms: TableTransforms = {
    /**
     * Delete rows.
     */

    deleteRows(
        editor: Editor,
        options: {
            at?: Set<number>,
        } = {}
    ): void {
        let { at } = options;
        if (at === undefined) {
            const selectedRow = LeydenEditor.selectedRow(editor);
            if (selectedRow === null) {
                return;
            }
            at = new Set([selectedRow]);
        }
        const { columns } = LeydenEditor.table(editor);
        if (columns < 1) {
            return;
        }
        const rowsBottomFirst = [...at].sort((a, b) => b - a);
        rowsBottomFirst.forEach(row => {
            const leftmost = LeydenEditor.coordsPath(editor, { x: 0, y: row });
            const rightmost = LeydenEditor.coordsPath(editor, { x: columns-1, y: row });
            Transforms.removeNodes(editor, {
                at: Editor.range(editor, leftmost, rightmost)
            });
        });
    },

    /**
     * Insert a row of cells.
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
            insertionCoords = Coordinates.move(insertionCoords, Direction2D.Down);
        }
        const insertionPath = LeydenEditor.coordsPath(editor, insertionCoords);
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
        if (options.at === options.to) {
            return;
        }
        if (options.at > options.to) {
            return;
        }
        return;
    },
};
