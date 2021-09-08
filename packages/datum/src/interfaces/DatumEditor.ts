import {
    BaseEditor,
    Path,
    Transforms,
} from 'slate';

import { Sheet } from './Sheet';
import { Coordinates } from './Coordinates';
import { Direction2D } from '../types';

export interface DatumEditor<
    Cols extends number,
    Rows extends number,
> extends Omit<BaseEditor, 'children'> {
    children: [Sheet<Cols, Rows>];
    getSheet: (editor: DatumEditor<Cols, Rows>) => Sheet<Cols, Rows>;
}

export const DatumEditor = {
    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath: <Cols extends number, Rows extends number>(
        editor: DatumEditor<Cols, Rows>,
        path: Path,
    ): Coordinates|null => {
        if (path[0] !== 0) {
            return null;
        }
        return Sheet.getNthCellCoords(DatumEditor.getSheet(editor), path[1]);
    },

    /**
     * Get the coordinates of the currently selected cell.
     */

    getSelectedCellCoords: <Cols extends number, Rows extends number>(
        editor: DatumEditor<Cols, Rows>
    ): Coordinates|null => {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return DatumEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the sheet within a datum editor.
     */

    getSheet: <Cols extends number, Rows extends number>(
        editor: DatumEditor<Cols, Rows>
    ): Sheet<Cols, Rows> => (
        editor.children[0]
    ),

    /**
     * Move the current cell selection in the provided direction.
     */

    moveCellSelection: <Cols extends number, Rows extends number>(
        editor: DatumEditor<Cols, Rows>,
        direction: Direction2D
    ): void => {
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

    selectCell: <Cols extends number, Rows extends number>(
        editor: DatumEditor<Cols, Rows>,
        coords: Coordinates
    ): void => {
        const sheet = DatumEditor.getSheet(editor);
        if (!Sheet.hasCoords(sheet, coords)) {
            return;
        }
        const newPath = Sheet.coordPath(sheet, coords);
        Transforms.select(DatumEditor.stripDimensions(editor), newPath);
    },

    /**
     * Strip dimensional information from an editor (useful when calling Slate functions).
     */

    stripDimensions: <Cols extends number, Rows extends number>(
        editor: DatumEditor<Rows, Cols>
    ): DatumEditor<number, number> => {
        return editor as unknown as DatumEditor<number, number>;
    },
};
