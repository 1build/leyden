import { useEffect, useMemo } from 'react';
import { Editor } from 'slate';

import { newEditor } from '@/Datum/editor';

export const useEditor = (): Editor => {
    const editor = useMemo(() => newEditor(), []);

    useEffect(() => {
        const { insertText } = editor;
        editor.insertText = (text) => {
            return insertText(text);
        };
    }, [editor]);

    return editor;
};
