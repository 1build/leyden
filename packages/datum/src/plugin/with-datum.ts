import { Editor } from 'slate';

export const withDatum = (editor: Editor): Editor => {
    const { insertText, isVoid } = editor;

    editor.insertText = text => {
        return insertText(text);
    };

    editor.isVoid = element => {
        return isVoid(element);
    };

    return editor;
};
