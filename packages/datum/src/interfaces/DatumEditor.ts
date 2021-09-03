import {
    BaseEditor,
    Path,
    Transforms,
} from 'slate';

import { Sheet } from './Element/Sheet';
import { Coordinates } from './Coordinates';
import { Direction2D } from '../types';

export interface DatumEditor extends Omit<BaseEditor, 'children'> {
    children: [Sheet];
    getSheet: (editor: DatumEditor) => Sheet;
}

export const DatumEditor = {
    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath: (editor: DatumEditor, path: Path): Coordinates|null => {
        if (path[0] !== 0) {
            return null;
        }
        return Sheet.getNthCellCoords(DatumEditor.getSheet(editor), path[1]);
    },

    /**
     * Get the coordinates of the currently selected cell.
     */

    getSelectedCellCoords: (editor: DatumEditor): Coordinates|null => {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return DatumEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the sheet within a datum editor.
     */

    getSheet: (editor: DatumEditor): Sheet => (
        editor.children[0]
    ),

    /**
     * Move the current cell selection in the provided direction.
     */

    moveCellSelection: (editor: DatumEditor, direction: Direction2D): void => {
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const curCoords = DatumEditor.getSelectedCellCoords(editor);
        if (curCoords === null) {
            return;
        }
        const newCoords = Coordinates.move(curCoords, direction);
        DatumEditor.selectCell(editor, newCoords);
    },

    /**
     * Select a cell at the provided coordinates.
     */

    selectCell: (editor: DatumEditor, coords: Coordinates): void => {
        const sheet = DatumEditor.getSheet(editor);
        if (!Sheet.hasCoords(sheet, coords)) {
            return;
        }
        const newPath = Sheet.coordPath(sheet, coords);
        Transforms.select(editor, newPath);
    },
};
