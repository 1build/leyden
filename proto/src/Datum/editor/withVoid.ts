import { Editor } from 'slate';

import { Cell } from '..';

export const withVoid = (editor: Editor): Editor => {
    const { isVoid } = editor;

    editor.isVoid = element => {
        if (Cell.isCell(element)) {
            return !Cell.isEditable(element);
        }
        return isVoid(element);
    };

    return editor;
};
