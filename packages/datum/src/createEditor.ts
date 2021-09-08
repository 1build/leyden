import { createEditor as createSlateEditor } from 'slate';

import { DatumEditor, withDatum } from '.';

export const createEditor = <
    Cols extends number,
    Rows extends number,
>(): DatumEditor<Cols, Rows> => (
    withDatum<Cols, Rows>(
        createSlateEditor()
    )
);
