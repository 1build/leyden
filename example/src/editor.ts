import { withDatum } from 'datum';
import { useMemo } from 'react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

const newEditor = (): Editor => (
    withHistory(
        withReact(
            withDatum(
                createEditor()
            )
        )
    )
);

export const useEditor = (): Editor => {
    const editor = useMemo(() => newEditor(), []);

    return editor;
};
