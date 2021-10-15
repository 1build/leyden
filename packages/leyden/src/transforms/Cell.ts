import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';

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
        const pathInCell = LeydenEditor.cellChildPath(editor, { at });
        const pathAtCell = LeydenEditor.cellPath(editor, { at });
        Editor.withoutNormalizing(editor, () => {
            Transforms.insertNodes(editor, children, { at: pathInCell });
            Transforms.removeNodes(editor, {
                at: pathAtCell,
                mode: 'highest',
                match: (_, path) => {
                    return path.length >= 3 && path[2] >= children.length;
                },
            });
        });
    },
};
