import {
    BaseEditor,
    Path,
    Transforms,
} from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';
import { Table } from './Table';
import { ValidationFunc, Validator } from './Validator';
import { Direction2D } from '../types';

export interface LeydenEditor extends Omit<BaseEditor, 'children'> {
    children: [Table];

    getValidationFunc: (validator: Validator) => ValidationFunc;
}

export const LeydenEditor = {
    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordPath: (editor: LeydenEditor, coords: Coordinates): Path => {
        const table = LeydenEditor.getTable(editor);
        return [0, (coords.y*table.cols)+coords.x];
    },

    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath: (
        editor: LeydenEditor,
        path: Path,
    ): Coordinates|null => {
        return Table.getNthCellCoords(
            LeydenEditor.getTable(editor),
            path[1]
        );
    },

    /**
     * Get the cell at `coords` in an editor.
     */

    getCellAtCoords: (
        editor: LeydenEditor,
        coords: Coordinates,
    ): Cell<CellType>|null => (
        Table.getCellAtCoords(
            LeydenEditor.getTable(editor),
            coords
        )
    ),

    /**
     * Get an editor's root table.
     */

    getTable: (editor: LeydenEditor): Table => (
        editor.children[0]
    ),

    /**
     * Move the current cell selection in the provided direction.
     */

    moveCellSelection: (
        editor: LeydenEditor,
        direction: Direction2D
    ): void => {
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const curCoords = LeydenEditor.selectedCoords(editor);
        if (curCoords === null) {
            return;
        }
        const newCoords = Coordinates.move(curCoords, direction);
        LeydenEditor.selectCell(editor, newCoords);
    },

    /**
     * Select a cell at the provided coordinates.
     */

    selectCell: (
        editor: LeydenEditor,
        coords: Coordinates
    ): void => {
        const table = LeydenEditor.getTable(editor);
        if (!Table.hasCoords(table, coords)) {
            return;
        }
        const newPath = LeydenEditor.coordPath(editor, coords);
        Transforms.select(editor, newPath);
    },

    /**
     * Get the index of the currently selected column.
     */

    selectedColumn: (editor: LeydenEditor): number|null => (
        LeydenEditor.selectedCoords(editor)?.x??null
    ),

    /**
     * Get the coordinates of the currently selected cell.
     */

    selectedCoords: (editor: LeydenEditor): Coordinates|null => {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return LeydenEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the index of the currently selected row.
     */

    selectedRow: (editor: LeydenEditor): number|null => (
        LeydenEditor.selectedCoords(editor)?.y??null
    ),
};
