import { Editor } from 'slate';
import {
    Cell,
    CellType,
    Coordinates,
    LeydenEditor,
} from 'leyden';
import { ReactEditor as SlateReactEditor } from 'slate-react';

export interface ReactEditor extends LeydenEditor, Omit<SlateReactEditor, 'children'> {
}

export const ReactEditor = {
    /**
     * Get the coordinates of a cell.
     */

    cellCoords: (
        editor: Editor,
        cell: Cell<CellType>,
    ): Coordinates|null => {
        const cellPath = SlateReactEditor.findPath(editor, cell);
        return LeydenEditor.pathCoords(editor, cellPath);
    },
};
