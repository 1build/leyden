import {
    BaseEditor,
    Path,
    Transforms,
} from 'slate';

import { Coordinates } from './Coordinates';
import { Sheet } from './Sheet';
import { ValidationFunc, Validator } from './Validator';
import { Direction2D } from '../types';

export interface LeydenEditor<
    Cols extends number,
    Rows extends number,
> extends Omit<BaseEditor, 'children'> {
    children: [Sheet<Cols, Rows>];
    getValidationFunc: (validator: Validator) => ValidationFunc;
}

export const LeydenEditor = {
    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        path: Path,
    ): Coordinates|null => {
        if (path[0] !== 0) {
            return null;
        }
        return Sheet.getNthCellCoords(LeydenEditor.getSheet(editor), path[1]);
    },

    /**
     * Get the coordinates of the currently selected cell.
     */

    getSelectedCellCoords: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>
    ): Coordinates|null => {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return LeydenEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the sheet within a leyden editor.
     */

    getSheet: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>
    ): Sheet<Cols, Rows> => (
        editor.children[0]
    ),

    /**
     * Move the current cell selection in the provided direction.
     */

    moveCellSelection: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        direction: Direction2D
    ): void => {
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const curCoords = LeydenEditor.getSelectedCellCoords(editor);
        if (curCoords === null) {
            return;
        }
        const newCoords = Coordinates.move(curCoords, direction);
        LeydenEditor.selectCell(editor, newCoords);
    },

    /**
     * Select a cell at the provided coordinates.
     */

    selectCell: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        coords: Coordinates
    ): void => {
        const sheet = LeydenEditor.getSheet(editor);
        if (!Sheet.hasCoords(sheet, coords)) {
            return;
        }
        const newPath = Sheet.coordPath(sheet, coords);
        Transforms.select(LeydenEditor.stripDimensions(editor), newPath);
    },

    /**
     * Strip dimensional information from an editor (useful when calling Slate functions).
     */

    stripDimensions: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Rows, Cols>
    ): LeydenEditor<number, number> => {
        return editor as unknown as LeydenEditor<number, number>;
    },
};
