import { useMemo } from 'react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { withNavigation } from './withNavigation';
import { withVoid } from './withVoid';

const newEditor = (): Editor => (
    withHistory(
        withReact(
            withNavigation(
                withVoid(
                    createEditor()
                )
            )
        )
    )
);

export const useEditor = (): Editor => {
    const editor = useMemo(() => newEditor(), []);

    return editor;
};
