import { createEditor as createSlateEditor } from 'slate';

import { withChalkboard } from './withChalkboard';
import { ChalkboardEditor } from './interfaces/ChalkboardEditor';

export const createEditor = <
    Cols extends number,
    Rows extends number,
>(): ChalkboardEditor<Cols, Rows> => (
    withChalkboard<Cols, Rows>(
        createSlateEditor()
    )
);
