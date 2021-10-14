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
        const first = LeydenEditor.cellChildPath(editor, { at });
        const beginCleanup = LeydenEditor.cellChildPath(editor, { at, idx: children.length });
        const endCleanup = LeydenEditor.cellChildPath(editor, { at, idx: children.length+cell.children.length-1 });
        const cleanupRange = {
            anchor: { path: beginCleanup, offset: 0 },
            focus: { path: endCleanup, offset: 0 },
        };
        Editor.withoutNormalizing(editor, () => {
            Transforms.insertNodes(editor, children, { at: first });
            Transforms.removeNodes(editor, { at: cleanupRange });
        });
    },
};
