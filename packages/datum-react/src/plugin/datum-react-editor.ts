import { DatumEditor } from 'datum';
import { ReactEditor } from 'slate-react';

export type DatumReactEditor = DatumEditor<number, number> & ReactEditor;
