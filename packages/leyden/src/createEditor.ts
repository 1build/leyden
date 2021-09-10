import { createEditor as createSlateEditor } from 'slate';

import { withLeyden } from './withLeyden';
import { LeydenEditor } from './interfaces/LeydenEditor';

export const createEditor = <
    Cols extends number,
    Rows extends number,
>(): LeydenEditor<Cols, Rows> => (
    withLeyden<Cols, Rows>(
        createSlateEditor()
    )
);
