import { createEditor as createSlateEditor } from 'slate';

import { EditorCreationOptions } from './utils/types';
import { withLeyden } from './withLeyden';

export const createEditor = (
    options: EditorCreationOptions
): ReturnType<typeof withLeyden> => (
    withLeyden(
        createSlateEditor(),
        options,
    )
);
