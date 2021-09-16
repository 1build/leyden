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

export interface LeydenEditorInterface {
    cells: (
        editor: LeydenEditor,
        options?: {
            reverse?: boolean
        }
    ) => Generator<LeydenEditorCell, void, undefined>;
    coordPath: (editor: LeydenEditor, coords: Coordinates) => Path;
    getCellCoordsAtPath: (editor: LeydenEditor, path: Path) => Coordinates|null;
    getCellAtCoords: (editor: LeydenEditor, coords: Coordinates) => Cell<CellType>|null;
    getCellTypeAtCoords: <T extends CellType>(editor: LeydenEditor, coords: Coordinates, type: T) => Cell<T>|null;
    getTable: (editor: LeydenEditor) => Table;
    moveCellSelection: (editor: LeydenEditor, direction: Direction2D) => void;
    nthCellPath: (n: number) => Path;
    selectCell: (editor: LeydenEditor, coords: Coordinates) => void;
    selectedColumn: (editor: LeydenEditor) => number|null;
    selectedCoords: (editor: LeydenEditor) => Coordinates|null;
    selectedRow: (editor: LeydenEditor) => number|null;
}

export const LeydenEditor: LeydenEditorInterface = {
    /**
     * Iterate over all cells in an editor.
     */

    *cells(
        editor: LeydenEditor,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<LeydenEditorCell, void, undefined> {
        const { reverse = false } = options;
        const table = LeydenEditor.getTable(editor);
        const { children: cells } = table;
        let index = reverse ? cells.length-1 : 0;

        while (reverse ? index >= 0 : index < cells.length) {
            const cell = cells[index];
            const cellPath = LeydenEditor.nthCellPath(index);
            const cellCoords = Table.getNthCellCoords(table, index);
            yield [cell, cellPath, cellCoords];
            index = reverse ? index-1 : index+1;
        }
    },

    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordPath(editor: LeydenEditor, coords: Coordinates): Path {
        const table = LeydenEditor.getTable(editor);
        return LeydenEditor.nthCellPath((coords.y*table.cols)+coords.x);
    },

    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath(
        editor: LeydenEditor,
        path: Path,
    ): Coordinates|null {
        return Table.getNthCellCoords(
            LeydenEditor.getTable(editor),
            path[1]
        );
    },

    /**
     * Get the cell at `coords` in an editor.
     */

    getCellAtCoords(
        editor: LeydenEditor,
        coords: Coordinates,
    ): Cell<CellType>|null {
        return Table.getCellAtCoords(
            LeydenEditor.getTable(editor),
            coords
        );
    },

    /**
     * Get the cell at `coords` in an editor.
     */

    getCellTypeAtCoords<T extends CellType>(
        editor: LeydenEditor,
        coords: Coordinates,
        type: T
    ): Cell<T>|null {
        const cell = Table.getCellAtCoords(
            LeydenEditor.getTable(editor),
            coords
        );
        if (cell !== null && Cell.isCellType(cell, type)) {
            return cell;
        }
        return null;
    },

    /**
     * Get an editor's root table.
     */

    getTable(editor: LeydenEditor): Table {
        return editor.children[0];
    },

    /**
     * Move the current cell selection in the provided direction.
     */

    moveCellSelection(
        editor: LeydenEditor,
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
        LeydenEditor.selectCell(editor, newCoords);
    },

    /**
     * Get the path to the nth cell in an editor. 
     */

    nthCellPath(n: number): Path {
        return [0, n];
    },

    /**
     * Select a cell at the provided coordinates.
     */

    selectCell(
        editor: LeydenEditor,
        coords: Coordinates
    ): void {
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

    selectedColumn(editor: LeydenEditor): number|null {
        return LeydenEditor.selectedCoords(editor)?.x??null;
    },

    /**
     * Get the coordinates of the currently selected cell.
     */

    selectedCoords(editor: LeydenEditor): Coordinates|null {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return LeydenEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the index of the currently selected row.
     */

    selectedRow(editor: LeydenEditor): number|null {
        return LeydenEditor.selectedCoords(editor)?.y??null;
    },
};

/**
 * `LeydenEditorCell` objects are returned when iterating over the cells of an editor.
 * They consist of the cell, its `Path` relative to the editor, and its `Coordinates`
 * relative to the table.
 */

export type LeydenEditorCell = [Cell<CellType>, Path, Coordinates];
