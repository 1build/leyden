import {
    BaseEditor,
    Path,
    Transforms,
} from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';
import { ValidationFunc, Validator } from './Validator';
import { Direction2D, Multiply, TupleOf } from '../types';

export interface LeydenEditor<
    Cols extends number,
    Rows extends number,
> extends Omit<BaseEditor, 'children'> {
    cols: Cols;
    rows: Rows;
    children: [TupleOf<Cell<CellType>, Multiply<Cols, Rows>>];
    getValidationFunc: (validator: Validator) => ValidationFunc;
}

export const LeydenEditor = {
    /**
     * cellsFitEditor is a typeguard to check if an array of cells conforms to editor dimensions.
     */

    cellsFitEditor: <Cols extends number, Rows extends number, T extends CellType>(
        cells: Cell<T>[],
        count: Multiply<Cols, Rows>,
    ): cells is TupleOf<Cell<T>, Multiply<Cols, Rows>> => (
        cells.length === count
    ),

    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordPath: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        coords: Coordinates,
    ): Path => ([
        (coords.y*editor.cols)+coords.x
    ]),

    /**
     * Generate an alphabetic column/row header from its 0-indexed position.
     */

    genAlphabeticHeader: (pos: number): string => {
        const positionBase26 = pos.toString(26);
        let label = '';
        for (let i = 0; i < positionBase26.length; i++) {
            const originalCharCode = positionBase26.charCodeAt(i);
            let adjustedCharCode: number;
            if (originalCharCode <= 57) {
                adjustedCharCode = originalCharCode + 17;
            } else {
                adjustedCharCode = originalCharCode - 22;
            }
            if (i < positionBase26.length-1) {
                adjustedCharCode -= 1;
            }
            label = `${label}${String.fromCharCode(adjustedCharCode)}`;
        }
        return label;
    },

    /**
     * Generate a numeric column/row header from its 0-indexed position.
     */

    genNumericHeader: (pos: number): string => (
        (pos+1).toString(10)
    ),

    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        path: Path,
    ): Coordinates|null => {
        return LeydenEditor.getNthCellCoords(editor, path[0]);
    },

    /**
     * Get the total number of editor cells as a number literal type.
     */

    getCellCount: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
    ): Multiply<Cols, Rows> => (
        editor.cols*editor.rows as Multiply<Cols, Rows>
    ),

    /**
     * Get the coordinates of the cell at the nth position of the flat cell list.
     */

    getNthCellCoords: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        n: number
    ): Coordinates => ({
        x: n % editor.cols,
        y: Math.floor(n/editor.cols),
    }),

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
     * Return true if a coordinate pair lies within the editor.
     */

    hasCoords: <Cols extends number, Rows extends number>(
        editor: LeydenEditor<Cols, Rows>,
        coords: Coordinates
    ): boolean => (
        coords.x<editor.cols && coords.y<editor.rows
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
        if (!LeydenEditor.hasCoords(editor, coords)) {
            return;
        }
        const newPath = LeydenEditor.coordPath(editor, coords);
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
