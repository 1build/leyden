import { createEditor as createSlateEditor } from 'slate';

import { withDatum } from './withDatum';
import { DatumEditor } from './interfaces/DatumEditor';

export const createEditor = <
    Cols extends number,
    Rows extends number,
>(): DatumEditor<Cols, Rows> => (
    withDatum<Cols, Rows>(
        createSlateEditor()
    )
);
