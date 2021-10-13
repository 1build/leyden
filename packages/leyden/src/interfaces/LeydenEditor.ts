import {
    BaseEditor,
    Editor,
    Operation,
    Path,
    Range,
} from 'slate';

import { Cell, CellType } from './Cell';
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
    cellPathCellIdx: (cellPath: CellPath) => number;
    cellChildPath: (
        editor: Editor,
        options: {
            at: Coordinates;
            idx?: number;
        }
    ) => Path;
    cellChildrenRange: (
        editor: Editor,
        options: {
            at: Coordinates;
        }
    ) => Range;
    cellPath: (
        editor: Editor,
        options: {
            at: Coordinates;
        }
    ) => CellPath;
    nthCellPath: (n: number) => CellPath;
    operationMovesCoords: (
        editor: Editor,
        op: Operation,
        coords: Coordinates
    ) => boolean;
    pathCellIdx: (path: Path) => number|null;
    pathCoords: (editor: Editor, path: Path) => Coordinates|null;
    pathIsCellPath: (path: Path) => path is CellPath;
    rowRange: (
        editor: Editor,
        options: {
            at: number,
        },
    ) => Range;
    selectedCell: (editor: Editor) => Cell<CellType>|null;
    selectedCellOfType: <T extends CellType>(editor: Editor, type: T) => Cell<T>|null;
    selectedColumn: (editor: Editor) => number|null;
    selectedCoords: (editor: Editor) => Coordinates|null;
    selectedRow: (editor: Editor) => number|null;
    subscribeToCell: <T extends CellType>(
        editor: Editor,
        type: T,
        subscriber: CellSubscriber<T>,
        options: {
            at: Coordinates
        }
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
    tablePath: () => Path;
}

export const LeydenEditor: LeydenEditorInterface = {
    /**
     * Get the index of the cell located at the provided cell path.
     */

    cellPathCellIdx(cellPath: CellPath): number {
        return cellPath[1];
    },

    /**
     * Get the Slate path to the child of a cell.
     *
     * If `options.idx` is not passed, a path to the cell's first child is returned.
     */

    cellChildPath(
        editor: Editor,
        options: {
            at: Coordinates;
            idx?: number;
        }
    ): Path {
        const { at, idx = 0 } = options;
        const coordsPath = LeydenEditor.cellPath(editor, { at });
        return [...coordsPath, idx];
    },

    /**
     * Get a range encompassing all of a cell's children.
     */

    cellChildrenRange(
        editor: Editor,
        options: {
            at: Coordinates;
        }
    ): Range {
        const { at } = options;
        const cell = Table.cell(LeydenEditor.table(editor), { at });
        if (cell === null) {
            throw new Error('Failed to get cell children range: could not get cell');
        }
        const firstPath = LeydenEditor.cellChildPath(editor, { at });
        const lastPath = LeydenEditor.cellChildPath(editor, { at, idx: cell.children.length-1 });
        return {
            anchor: { path: firstPath, offset: 0 },
            focus: { path: lastPath, offset: 0 },
        };
    },

    /**
     * Get the Slate path to a cell.
     */

    cellPath(
        editor: Editor,
        options: {
            at: Coordinates;
        }
    ): CellPath {
        const { at } = options;
        const cellIdx = Table.cellIdx(LeydenEditor.table(editor), at);
        return LeydenEditor.nthCellPath(cellIdx);
    },

    /**
     * Get the path to the nth cell in an editor. 
     */

    nthCellPath(n: number): CellPath {
        return [0, n];
    },

    /**
     * Return true if an operation moves the cell located at the provided coordinates.
     */

    operationMovesCoords(
        editor: Editor,
        op: Operation,
        coords: Coordinates
    ): boolean {
        if (op.type === 'insert_node' || op.type === 'remove_node') {
            if (!LeydenEditor.pathIsCellPath(op.path)) {
                return false;
            }
            const pathCoords = LeydenEditor.pathCoords(editor, op.path);
            if (pathCoords === null) {
                return false;
            }
            return pathCoords.x <= coords.x || pathCoords.y <= coords.y;
        }
        if (op.type === 'move_node') {
            return [op.path, op.newPath].some(movePath => {
                if (LeydenEditor.pathIsCellPath(movePath)) {
                    const moveCoords = LeydenEditor.pathCoords(editor, movePath);
                    return moveCoords !== null && Coordinates.equals(coords, moveCoords);
                }

            });
        }
        return false;
    },

    /**
     * Get the index of the cell located at the provided path.
     */

    pathCellIdx(path: Path): number|null {
        if (path.length < 2) {
            return null;
        }
        return path[1];
    },

    /**
     * Get the coordinates of the cell located at the provided path.
     */

    pathCoords(
        editor: Editor,
        path: Path,
    ): Coordinates|null {
        const cellIdx = LeydenEditor.pathCellIdx(path);
        if (cellIdx === null) {
            return null;
        }
        return Table.nthCellCoords(LeydenEditor.table(editor), cellIdx);
    },

    /**
     * Typeguard, determines if a path points directly to a table cell.
     */

    pathIsCellPath(path: Path): path is CellPath {
        return path.length === 2;
    },

    /**
     * Returns a slate range around a table row.
     */

    rowRange(
        editor: Editor,
        options: {
            at: number,
        },
    ): Range {
        const { at } = options;
        const { columns } = LeydenEditor.table(editor);
        const leftmost = LeydenEditor.cellPath(editor, { at: { x: 0, y: at } });
        const rightmost = LeydenEditor.cellPath(editor, { at: { x: columns-1, y: at } });
        return Editor.range(editor, leftmost, rightmost);
    },

    /**
     * If a cell is selected, return it.
     */

    selectedCell(editor: Editor): Cell<CellType>|null {
        const selectedCoords = LeydenEditor.selectedCoords(editor);
        if (selectedCoords === null) {
            return null;
        }
        return Table.cell(LeydenEditor.table(editor), { at: selectedCoords });
    },

    /**
     * If a cell of the specified type is selected, return it.
     */

    selectedCellOfType<T extends CellType>(editor: Editor, type: T): Cell<T>|null {
        const selectedCoords = LeydenEditor.selectedCoords(editor);
        if (selectedCoords === null) {
            return null;
        }
        return Table.cellOfType(LeydenEditor.table(editor), type, { at: selectedCoords });
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
        type: T,
        subscriber: CellSubscriber<T>,
        options: {
            at: Coordinates
        }
    ): Unsubscriber {
        const { at } = options;
        const cellPath = LeydenEditor.cellPath(editor, { at });
        return LeydenEditor.subscribeToOperations(editor, op => {
            if (op.type === 'set_node' && Path.equals(op.path, cellPath)) {
                const val = Table.cellOfType(LeydenEditor.table(editor), type, { at });
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

    /**
     * Get the path to the editor's table.
     */

    tablePath(): Path {
        return [0];
    }
};

/**
 * A path that points directly to a table cell
 */

export type CellPath = [number, number];
