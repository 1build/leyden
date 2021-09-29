import { createEditor as createSlateEditor } from 'slate';

import { CreateEditorOptions } from './utils/types';
import { withLeyden } from './withLeyden';

export const createEditor = (opts: CreateEditorOptions): ReturnType<typeof withLeyden> => (
    withLeyden({
        editor: createSlateEditor(),
        ...opts,
    })
);
