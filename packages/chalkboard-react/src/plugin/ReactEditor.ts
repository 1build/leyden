import { ChalkboardEditor } from 'chalkboard';
import { ReactEditor as SlateReactEditor } from 'slate-react';

export interface ReactEditor<
    Cols extends number,
    Rows extends number,
> extends ChalkboardEditor<Cols, Rows>, Omit<SlateReactEditor, 'children'> {
}

export const ReactEditor = {
};
