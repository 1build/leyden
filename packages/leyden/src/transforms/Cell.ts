import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Table } from '../interfaces/Table';

export interface CellTransforms {
    setCell: <T extends CellType=CellType>(
        editor: Editor,
        props: Partial<Cell<T>>,
        options?: {
            at?: Coordinates;
        }
    ) => void;
    setCellChildren: <T extends CellType=CellType>(
        editor: Editor,
        children: Cell<T>['children'],
        options?: {
            at?: Coordinates;
        }
    ) => void;
}

export const CellTransforms: CellTransforms = {
    /**
     * Set a cell's properties.
     */

    setCell<T extends CellType=CellType>(
        editor: Editor,
        props: Partial<Cell<T>>,
        options: {
            at?: Coordinates
        } = {}
    ): void {
        const { at = LeydenEditor.selectedCoords(editor) } = options;
        if (at === null) {
            throw new Error('failed to set cell props: no `at` passed or cell selected');
        }
        Transforms.setNodes(editor, props, {
            at: LeydenEditor.cellPath(editor, { at }),
        });
    },

    /**
     * Set a cell's children.
     */

    setCellChildren<T extends CellType=CellType>(
        editor: Editor,
        children: Cell<T>['children'],
        options: {
            at?: Coordinates;
        } = {}
    ): void {
        if (children.length === 0) {
            throw new Error('failed to set cell children: no children passed');
        }
        const { at = LeydenEditor.selectedCoords(editor) } = options;
        if (at === null) {
            throw new Error('failed to set cell children: no `at` passed or cell selected');
        }
        const cell = Table.cell(LeydenEditor.table(editor), { at });
        if (cell === null) {
            throw new Error('failed to set cell children: could not get cell data');
        }
        const first = LeydenEditor.cellChildPath(editor, { at });
        const last = LeydenEditor.cellChildPath(editor, { at, idx: cell.children.length-1 });
        const cleanupRange = {
            anchor: { path: first, offset: 0 },
            focus: { path: last, offset: 0 },
        };
        Editor.withoutNormalizing(editor, () => {
            Transforms.removeNodes(editor, { at: cleanupRange });
            Transforms.insertNodes(editor, children, { at: first });
        });
    },
};
