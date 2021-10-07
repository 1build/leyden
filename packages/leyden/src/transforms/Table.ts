import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Table } from '../interfaces/Table';
import { Direction2D, InsertRowPosition } from '../utils/types';
import { insertRowPositionIsAbove } from '../utils/typeGuards';

export interface TableTransforms {
    deleteRows: (
        editor: Editor,
        rows: Set<number>,
    ) => void;
    insertRows: (
        editor: Editor,
        cells: Cell<CellType>[],
        position: InsertRowPosition
    ) => void;
}

export const TableTransforms: TableTransforms = {
    /**
     * Delete rows.
     */

    deleteRows(
        editor: Editor,
        rows: Set<number>,
    ): void {
        const { columns } = LeydenEditor.table(editor);
        if (columns < 1) {
            return;
        }
        const rowsBottomFirst = [...rows].sort((a, b) => b - a);
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
        position: InsertRowPosition
    ): void {
        const table = LeydenEditor.table(editor);
        const hangingCells = cells.length%table.columns;
        if (hangingCells !== 0) {
            throw new Error(`failed to insert row, (${cells.length} cells cannot make rows of ${table.columns})`);
        }
        if (insertRowPositionIsAbove(position)) {
            const insertionCell = Table.row(table, position.above).next().value;
            if (!insertionCell) {
                return;
            }
            const insertionPath = LeydenEditor.coordsPath(editor, insertionCell[1]);
            Transforms.insertNodes(editor, cells, { at: insertionPath });
        } else {
            const insertUnderCell = Table.row(table, position.below).next().value;
            if (!insertUnderCell) {
                return;
            }
            const insertionCoords = Coordinates.move(insertUnderCell[1], Direction2D.Down);
            const insertionPath = LeydenEditor.coordsPath(editor, insertionCoords);
            Transforms.insertNodes(editor, cells, { at: insertionPath });
        }
    }
};
