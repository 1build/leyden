import { DatumEditor } from 'datum';
import { ReactEditor as SlateReactEditor } from 'slate-react';

export interface ReactEditor<
    Cols extends number,
    Rows extends number,
> extends DatumEditor<Cols, Rows>, Omit<SlateReactEditor, 'children'> {
}

export const ReactEditor = {
};
