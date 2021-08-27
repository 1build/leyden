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
    // If not pre-defined, `Element` imports from `slate` as `any` - possibly a circular issue?
    type SlateDatumElement = DatumElement<ElementType, Descendant[]>;

    interface CustomTypes {
        Editor: Editor;
        Element: SlateDatumElement;
        Text: DatumText<TextType>;
    }
}
