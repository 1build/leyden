import { Editor } from 'slate';

import { Cell } from '../interfaces/Element/Cell';

export const withDatum = (editor: Editor): Editor => {
    const { insertText, isVoid } = editor;

    editor.insertText = text => {
        return insertText(text);
    };

    editor.isVoid = element => {
        if (Cell.isCell(element)) {
            return !Cell.isEditable(element);
        }
        return isVoid(element);
    };

    return editor;
};
