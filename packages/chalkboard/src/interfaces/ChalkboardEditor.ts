import {
    BaseEditor,
    Path,
    Transforms,
} from 'slate';

import { Sheet } from './Sheet';
import { Coordinates } from './Coordinates';
import { Direction2D } from '../types';

export interface ChalkboardEditor<
    Cols extends number,
    Rows extends number,
> extends Omit<BaseEditor, 'children'> {
    children: [Sheet<Cols, Rows>];
    getSheet: (editor: ChalkboardEditor<Cols, Rows>) => Sheet<Cols, Rows>;
}

export const ChalkboardEditor = {
    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath: <Cols extends number, Rows extends number>(
        editor: ChalkboardEditor<Cols, Rows>,
        path: Path,
    ): Coordinates|null => {
        if (path[0] !== 0) {
            return null;
        }
        return Sheet.getNthCellCoords(ChalkboardEditor.getSheet(editor), path[1]);
    },

    /**
     * Get the coordinates of the currently selected cell.
     */

    getSelectedCellCoords: <Cols extends number, Rows extends number>(
        editor: ChalkboardEditor<Cols, Rows>
    ): Coordinates|null => {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return ChalkboardEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the sheet within a chalkboard editor.
     */

    getSheet: <Cols extends number, Rows extends number>(
        editor: ChalkboardEditor<Cols, Rows>
    ): Sheet<Cols, Rows> => (
        editor.children[0]
    ),

    /**
     * Move the current cell selection in the provided direction.
     */

    moveCellSelection: <Cols extends number, Rows extends number>(
        editor: ChalkboardEditor<Cols, Rows>,
        direction: Direction2D
    ): void => {
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const curCoords = ChalkboardEditor.getSelectedCellCoords(editor);
        if (curCoords === null) {
            return;
        }
        const newCoords = Coordinates.move(curCoords, direction);
        ChalkboardEditor.selectCell(editor, newCoords);
    },

    /**
     * Select a cell at the provided coordinates.
     */

    selectCell: <Cols extends number, Rows extends number>(
        editor: ChalkboardEditor<Cols, Rows>,
        coords: Coordinates
    ): void => {
        const sheet = ChalkboardEditor.getSheet(editor);
        if (!Sheet.hasCoords(sheet, coords)) {
            return;
        }
        const newPath = Sheet.coordPath(sheet, coords);
        Transforms.select(ChalkboardEditor.stripDimensions(editor), newPath);
    },

    /**
     * Strip dimensional information from an editor (useful when calling Slate functions).
     */

    stripDimensions: <Cols extends number, Rows extends number>(
        editor: ChalkboardEditor<Rows, Cols>
    ): ChalkboardEditor<number, number> => {
        return editor as unknown as ChalkboardEditor<number, number>;
    },
};
