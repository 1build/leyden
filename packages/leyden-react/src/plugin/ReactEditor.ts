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
     */

    cellCoords: (
        editor: Editor,
        node: Descendant,
    ): Coordinates|null => {
        const cellPath = SlateReactEditor.findPath(editor, node);
        return LeydenEditor.pathCoords(editor, cellPath);
    },
};
