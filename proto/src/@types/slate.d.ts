import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

import {
    DatumElement,
    DatumText,
    ElementType,
    TextType,
} from '../Datum';

type Editor =
    & BaseEditor
    & HistoryEditor
    & ReactEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: Editor;
        Element: DatumElement<ElementType, Descendant[]>;
        Text: DatumText<TextType>;
    }
}
