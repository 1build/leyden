import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

export const newEditor = (): Editor => (
    withHistory(
        withReact(
            createEditor()
        )
    )
);
