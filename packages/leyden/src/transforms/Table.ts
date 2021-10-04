import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Table } from '../interfaces/Table';
import { Direction2D, InsertRowPosition } from '../utils/types';
import { insertRowPositionIsAbove } from '../utils/typeGuards';

export interface TableTransforms {
    insertRow: (
        editor: Editor,
        cells: Cell<CellType>[],
        position: InsertRowPosition
    ) => void;
}

export const TableTransforms: TableTransforms = {
    /**
     * Insert a row of cells.
     */

    insertRow(
        editor: Editor,
        cells: Cell<CellType>[],
        position: InsertRowPosition
    ): void {
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
        Transforms.setNodes(editor, { rows: curRows+1 }, { at: LeydenEditor.tablePath() });
    }
};
