import { SlateDatumElement } from 'datum';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

import {
    DatumText,
    TextType,
} from '../Datum';

type Editor =
    & BaseEditor
    & HistoryEditor
    & ReactEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: Editor;
        Element: SlateDatumElement;
        Text: DatumText<TextType>;
    }
}
