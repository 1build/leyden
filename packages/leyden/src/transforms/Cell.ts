import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';

export interface CellTransforms {
    setCell: <T extends CellType=CellType>(
        editor: Editor,
        props: Partial<Cell<T>>,
        options?: {
            at?: Coordinates
        }
    ) => void;
}

export const CellTransforms: CellTransforms = {
    /**
     * Set new properties on a cell at some coordinates.
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
            return;
        }
        Transforms.setNodes(editor, props, {
            at: LeydenEditor.coordsPath(editor, at),
        });
    }
};
