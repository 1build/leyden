import { createEditor as createSlateEditor } from 'slate';

import { withLeyden } from './withLeyden';
import { ValidationFuncs } from './interfaces/Validator';

export interface CreateEditorOptions {
    validators: ValidationFuncs;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createEditor = (opts: CreateEditorOptions) => (
    withLeyden(
        createSlateEditor(),
        opts
    )
);
