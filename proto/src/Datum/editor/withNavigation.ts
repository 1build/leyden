import { Editor } from 'slate';

export const withNavigation = (editor: Editor): Editor => {
    const { insertText } = editor;

    editor.insertText = text => {
        return insertText(text);
    };

    return editor;
};
