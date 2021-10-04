import { Editor, Transforms } from 'slate';

import { Cell, CellType } from '../interfaces/Cell';
import { Coordinates } from '../interfaces/Coordinates';
import { LeydenEditor } from '../interfaces/LeydenEditor';

export interface CellTransforms {
    setCell: <T extends CellType=CellType>(
        editor: Editor,
        props: Partial<Cell<T>>,
        coordinates: Coordinates,
    ) => void;
}

export const CellTransforms: CellTransforms = {
    /**
     * Set new properties on a cell at some coordinates.
     */

    setCell<T extends CellType=CellType>(
        editor: Editor,
        props: Partial<Cell<T>>,
        coordinates: Coordinates
    ): void {
        const path = LeydenEditor.coordsPath(editor, coordinates);
        Transforms.setNodes(editor, props, { at: path });
    }
};
