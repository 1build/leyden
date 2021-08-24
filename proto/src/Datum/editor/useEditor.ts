import { useRef } from 'react';
import { Editor } from 'slate';

import { newEditor } from '@/Datum/editor';

export const useEditor = (): Editor => {
    const editor = useRef(newEditor());

    return editor.current;
};
