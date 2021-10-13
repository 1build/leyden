import { Editor, Transforms } from 'slate';

import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Table } from '../interfaces/Table';

export interface SelectionTransforms {
    moveCellSelection: (
        editor: Editor,
        options: {
            direction: 'up'|'down'|'left'|'right'
        }
    ) => void;
    selectCell: (
        editor: Editor,
        options: {
            at: Coordinates
        }
    ) => void;
}

export const SelectionTransforms: SelectionTransforms = {
    /**
     * Move the current cell selection in a direction.
     */

    moveCellSelection(
        editor: Editor,
        options: {
            direction: 'up'|'down'|'left'|'right'
        }
    ): void {
        const { direction } = options;
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const curCoords = LeydenEditor.selectedCoords(editor);
        if (curCoords === null) {
            return;
        }
        const newCoords = Coordinates.move(curCoords, direction);
        SelectionTransforms.selectCell(editor, { at: newCoords });
    },

    /**
     * Select a cell at some coordinates.
     */

    selectCell(
        editor: Editor,
        options: {
            at: Coordinates
        }
    ): void {
        const table = LeydenEditor.table(editor);
        if (!Table.hasCoords(table, options)) {
            if (editor.selection) {
                Transforms.deselect(editor);
            }
            return;
        }
        const newPath = LeydenEditor.cellPath(editor, options);
        Transforms.select(editor, newPath);
    },
};
