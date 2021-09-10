import { LeydenEditor } from 'leyden';
import { ReactEditor as SlateReactEditor } from 'slate-react';

export interface ReactEditor<
    Cols extends number,
    Rows extends number,
> extends LeydenEditor<Cols, Rows>, Omit<SlateReactEditor, 'children'> {
}

export const ReactEditor = {
};
