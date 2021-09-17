import { Editor, Transforms } from 'slate';

import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Table } from '../interfaces/Table';
import { Direction2D } from '../types';

export interface SelectionTransforms {
    moveCellSelection: (editor: Editor, direction: Direction2D) => void;
    selectCell: (editor: Editor, coords: Coordinates) => void;
}

export const SelectionTransforms: SelectionTransforms = {
    /**
     * Move the current cell selection in a direction.
     */

    moveCellSelection(
        editor: Editor,
        direction: Direction2D
    ): void {
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const curCoords = LeydenEditor.selectedCoords(editor);
        if (curCoords === null) {
            return;
        }
        const newCoords = Coordinates.move(curCoords, direction);
        SelectionTransforms.selectCell(editor, newCoords);
    },

    /**
     * Select a cell at some coordinates.
     */

    selectCell(
        editor: Editor,
        coords: Coordinates
    ): void {
        const table = LeydenEditor.getTable(editor);
        if (!Table.hasCoords(table, coords)) {
            if (editor.selection) {
                Transforms.deselect(editor);
            }
            return;
        }
        const newPath = LeydenEditor.coordPath(editor, coords);
        Transforms.select(editor, newPath);
    },
};
