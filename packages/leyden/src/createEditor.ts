import { createEditor as createSlateEditor } from 'slate';

import { withLeyden } from './withLeyden';
import { LeydenEditor } from './interfaces/LeydenEditor';
import { ValidationFuncs } from './interfaces/Validator';

export const createEditor = <
    Cols extends number,
    Rows extends number,
>(validators: ValidationFuncs): LeydenEditor<Cols, Rows> => (
    withLeyden<Cols, Rows>(
        createSlateEditor(),
        validators
    )
);
