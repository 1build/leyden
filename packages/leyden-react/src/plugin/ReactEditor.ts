import { LeydenEditor } from 'leyden';
import { ReactEditor as SlateReactEditor } from 'slate-react';

export interface ReactEditor extends LeydenEditor, Omit<SlateReactEditor, 'children'> {
}

export const ReactEditor = {
};
