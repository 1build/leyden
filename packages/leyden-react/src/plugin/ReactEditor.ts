import { Descendant, Editor } from 'slate';
import {
    Coordinates,
    LeydenEditor,
} from 'leyden';
import { ReactEditor as SlateReactEditor } from 'slate-react';

export interface ReactEditor extends LeydenEditor, Omit<SlateReactEditor, 'children'> {
}

export const ReactEditor = {
    /**
     * Get the coordinates of a cell.
     * If `node` is not found within `editor`, `null` is returned. 
     */

    cellCoords: (
        editor: Editor,
        node: Descendant,
    ): Coordinates|null => {
        try {
            const cellPath = SlateReactEditor.findPath(editor, node);
            return LeydenEditor.pathCoords(editor, cellPath);
        } catch {
            return null;
        }
    },
};
