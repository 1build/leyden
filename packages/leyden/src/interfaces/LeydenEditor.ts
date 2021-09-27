import { BaseEditor, Editor, Operation, Path } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';
import { Table } from './Table';
import { ValidationFunc, Validator } from './Validator';
import {
    CellSubscriber,
    Direction2D,
    OperationSubscriber,
    SelectionSubscriber,
    Unsubscriber,
} from '../types';
import { OPERATION_SUBSCRIBERS } from '../utils/weakMaps';

export interface LeydenEditor extends Omit<BaseEditor, 'children'> {
    children: [Table];

    getValidationFunc: (validator: Validator) => ValidationFunc;
}

export interface LeydenEditorInterface {
    cells: (
        editor: Editor,
        options?: {
            reverse?: boolean
        }
    ) => Generator<LeydenEditorCell, void, undefined>;
    column: (
        editor: Editor,
        column: number,
        options?: {
            reverse?: boolean
        }
    ) => Generator<LeydenEditorCell, void, undefined>;
    coordPath: (editor: Editor, coords: Coordinates) => Path;
    getCellCoordsAtPath: (editor: Editor, path: Path) => Coordinates|null;
    getCellAtCoords: (editor: Editor, coords: Coordinates) => Cell<CellType>|null;
    getCellTypeAtCoords: <T extends CellType>(editor: Editor, coords: Coordinates, type: T) => Cell<T>|null;
    getTable: (editor: Editor) => Table;
    nthCellPath: (n: number) => Path;
    row: (
        editor: Editor,
        row: number,
        options?: {
            reverse?: boolean
        }
    ) => Generator<LeydenEditorCell, void, undefined>;
    selectedColumn: (editor: Editor) => number|null;
    selectedCoords: (editor: Editor) => Coordinates|null;
    selectedRow: (editor: Editor) => number|null;
    subscribeToCell: <T extends CellType>(
        editor: Editor,
        coords: Coordinates,
        type: T,
        subscriber: CellSubscriber<T>,
    ) => Unsubscriber;
    subscribeToOperations: (
        editor: Editor,
        subscriber: OperationSubscriber
    ) => Unsubscriber;
    subscribeToSelection: (
        editor: Editor,
        subscriber: SelectionSubscriber
    ) => Unsubscriber;
}

export const LeydenEditor: LeydenEditorInterface = {
    /**
     * Iterate over all cells in an editor.
     */

    *cells(
        editor: Editor,
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
            const cellCoords = Table.getNthCellCoords(table, index);
            const cellPath = LeydenEditor.nthCellPath(index);
            yield [cell, cellCoords, cellPath];
            index = reverse ? index-1 : index+1;
        }
    },

    /**
     * Iterate over all cells in a column.
     */

    *column(
        editor: Editor,
        column: number,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<LeydenEditorCell, void, undefined> {
        const { reverse = false } = options;
        const table = LeydenEditor.getTable(editor);
        let coordinates = {
            x: column,
            y: reverse ? table.rows-1 : 0,
        };

        while (reverse ? coordinates.y >= 0 : coordinates.y < table.rows) {
            const cell = Table.getCellAtCoords(table, coordinates);
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coordinates.x}, ${coordinates.y})`);
            }
            const cellPath = LeydenEditor.coordPath(editor, coordinates);
            yield [cell, coordinates, cellPath];
            coordinates = Coordinates.move(
                coordinates,
                reverse ? Direction2D.Up : Direction2D.Down
            );
        }
    },

    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordPath(editor: Editor, coords: Coordinates): Path {
        const table = LeydenEditor.getTable(editor);
        return LeydenEditor.nthCellPath((coords.y*table.cols)+coords.x);
    },

    /**
     * Get the coordinates of the cell located at the provided path.
     */

    getCellCoordsAtPath(
        editor: Editor,
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
        editor: Editor,
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
        editor: Editor,
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

    getTable(editor: Editor): Table {
        return editor.children[0];
    },

    /**
     * Get the path to the nth cell in an editor. 
     */

    nthCellPath(n: number): Path {
        return [0, n];
    },

    /**
     * Iterate over all cells in a row.
     */

    *row(
        editor: Editor,
        row: number,
        options: {
            reverse?: boolean
        } = {}
    ): Generator<LeydenEditorCell, void, undefined> {
        const { reverse = false } = options;
        const table = LeydenEditor.getTable(editor);
        let coordinates = {
            x: reverse ? table.cols-1 : 0,
            y: row
        };

        while (reverse ? coordinates.x >= 0 : coordinates.x < table.cols) {
            const cell = Table.getCellAtCoords(table, coordinates);
            if (cell === null) {
                throw new Error(`failed to get cell at coordinates (${coordinates.x}, ${coordinates.y})`);
            }
            const cellPath = LeydenEditor.coordPath(editor, coordinates);
            yield [cell, coordinates, cellPath];
            coordinates = Coordinates.move(
                coordinates,
                reverse ? Direction2D.Left : Direction2D.Right
            );
        }
    },

    /**
     * Get the index of the currently selected column.
     */

    selectedColumn(editor: Editor): number|null {
        return LeydenEditor.selectedCoords(editor)?.x??null;
    },

    /**
     * Get the coordinates of the currently selected cell.
     */

    selectedCoords(editor: Editor): Coordinates|null {
        const { selection } = editor;
        if (!selection) {
            return null;
        }
        return LeydenEditor.getCellCoordsAtPath(editor, selection.focus.path);
    },

    /**
     * Get the index of the currently selected row.
     */

    selectedRow(editor: Editor): number|null {
        return LeydenEditor.selectedCoords(editor)?.y??null;
    },

    /**
     * Subscribe to the value a cell of a specific type at the specified coordinates.
     * Does not fire when children are changed.
     */

    subscribeToCell<T extends CellType>(
        editor: Editor,
        coords: Coordinates,
        type: T,
        subscriber: CellSubscriber<T>,
    ): Unsubscriber {
        const cellPath = LeydenEditor.coordPath(editor, coords);
        return LeydenEditor.subscribeToOperations(editor, op => {
            if (op.type === 'set_node' && Path.equals(op.path, cellPath)) {
                const val = LeydenEditor.getCellTypeAtCoords(editor, coords, type);
                if (val !== null) {
                    subscriber(val);
                }
            }
        });
    },

    /**
     * Fire the passed function every time an operation is applied.
     * Returns a function which will end the subscription.
     */

    subscribeToOperations(
        editor: Editor,
        subscriber: OperationSubscriber
    ): Unsubscriber {
        const previousSubscribers = OPERATION_SUBSCRIBERS.get(editor);
        if (previousSubscribers) {
            previousSubscribers.add(subscriber);
        } else {
            OPERATION_SUBSCRIBERS.set(editor, new Set([subscriber]));
        }
        return () => {
            const previousSubscribers = OPERATION_SUBSCRIBERS.get(editor);
            if (previousSubscribers) {
                previousSubscribers.delete(subscriber);
            }
        };
    },

    /**
     * Subscribe to the table's currently selected coordinates, or null if
     * there is no active selection.
     */

    subscribeToSelection(
        editor: Editor,
        subscriber: SelectionSubscriber
    ): Unsubscriber {
        return LeydenEditor.subscribeToOperations(editor, op => {
            if (Operation.isSelectionOperation(op)) {
                subscriber(LeydenEditor.selectedCoords(editor));
            }
        });
    },
};

/**
 * `LeydenEditorCell` objects are returned when iterating over the cells of an editor.
 * They consist of the cell, its `Coordinates`, and its Slate `Path` relative to the editor.
 */

export type LeydenEditorCell = [Cell<CellType>, Coordinates, Path];
