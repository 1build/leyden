import { useMemo } from 'react';
import { Editor } from 'slate';

import { newEditor } from '@/Datum/editor';

export const useEditor = (): Editor => {
    const editor = useMemo(() => newEditor(), []);

    return editor;
};
