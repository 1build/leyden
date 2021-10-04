import { BaseEditor, Editor, Operation, Path } from 'slate';

import { CellType } from './Cell';
import { Coordinates } from './Coordinates';
import { Table } from './Table';
import { ValidationFunc, Validator } from './Validator';
import {
    CellSubscriber,
    OperationSubscriber,
    SelectionSubscriber,
    Unsubscriber,
} from '../utils/types';
import { OPERATION_SUBSCRIBERS } from '../utils/weakMaps';

export interface LeydenEditor extends Omit<BaseEditor, 'children'> {
    children: [Table];

    getValidationFunc: (validator: Validator) => ValidationFunc;
}

export interface LeydenEditorInterface {
    coordsPath: (editor: Editor, coords: Coordinates) => Path;
    nthCellPath: (n: number) => Path;
    pathCoords: (editor: Editor, path: Path) => Coordinates|null;
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
    table: (editor: Editor) => Table;
}

export const LeydenEditor: LeydenEditorInterface = {
    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordsPath(editor: Editor, coords: Coordinates): Path {
        const table = LeydenEditor.table(editor);
        return LeydenEditor.nthCellPath((coords.y*table.cols)+coords.x);
    },

    /**
     * Get the path to the nth cell in an editor. 
     */

    nthCellPath(n: number): Path {
        return [0, n];
    },

    /**
     * Get the coordinates of the cell located at the provided path.
     */

    pathCoords(
        editor: Editor,
        path: Path,
    ): Coordinates|null {
        return Table.nthCellCoords(
            LeydenEditor.table(editor),
            path[1]
        );
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
        return LeydenEditor.pathCoords(editor, selection.focus.path);
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
        const cellPath = LeydenEditor.coordsPath(editor, coords);
        return LeydenEditor.subscribeToOperations(editor, op => {
            if (op.type === 'set_node' && Path.equals(op.path, cellPath)) {
                const val = Table.cellOfType(LeydenEditor.table(editor), coords, type);
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

    /**
     * Get an editor's table.
     */

    table(editor: Editor): Table {
        return editor.children[0];
    },
};
