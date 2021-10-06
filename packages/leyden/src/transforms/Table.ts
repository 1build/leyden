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
        const { cols } = LeydenEditor.table(editor);
        if (cols < 1) {
            return;
        }
        const rowsBottomFirst = [...rows].sort((a, b) => b - a);
        rowsBottomFirst.forEach(row => {
            const leftmost = LeydenEditor.coordsPath(editor, { x: 0, y: row });
            const rightmost = LeydenEditor.coordsPath(editor, { x: cols-1, y: row });
            Transforms.removeNodes(editor, {
                at: Editor.range(editor, leftmost, rightmost)
            });
        });
        // Update table row count
        const curRows = LeydenEditor.table(editor).rows;
        Transforms.setNodes(editor, { rows: curRows+rows.size }, { at: LeydenEditor.tablePath() });
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
        const hangingCells = cells.length%table.cols;
        if (hangingCells !== 0) {
            throw new Error(`failed to insert row, (${cells.length} cells cannot make rows of ${table.cols})`);
        }
        const rowsToAdd = cells.length/table.cols;
        // Insert row
        if (insertRowPositionIsAbove(position)) {
            const insertionCell = Table.row(
                LeydenEditor.table(editor),
                position.above
            ).next().value;
            if (!insertionCell) {
                return;
            }
            const insertionPath = LeydenEditor.coordsPath(editor, insertionCell[1]);
            Transforms.insertNodes(editor, cells, { at: insertionPath });
        } else {
            const insertUnderCell = Table.row(
                LeydenEditor.table(editor),
                position.below
            ).next().value;
            if (!insertUnderCell) {
                return;
            }
            const insertionCoords = Coordinates.move(insertUnderCell[1], Direction2D.Down);
            const insertionPath = LeydenEditor.coordsPath(editor, insertionCoords);
            Transforms.insertNodes(editor, cells, { at: insertionPath });
        }
        // Update table row count
        const curRows = LeydenEditor.table(editor).rows;
        Transforms.setNodes(editor, { rows: curRows+rowsToAdd }, { at: LeydenEditor.tablePath() });
    }
};
