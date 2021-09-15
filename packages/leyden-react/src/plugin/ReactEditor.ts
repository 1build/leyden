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
        editor: ReactEditor,
        cell: Cell<CellType>,
    ): Coordinates|null => {
        const cellPath = SlateReactEditor.findPath(editor, cell);
        return LeydenEditor.getCellCoordsAtPath(editor, cellPath);
    },
};
