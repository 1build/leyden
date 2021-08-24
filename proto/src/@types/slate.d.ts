import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

interface BaseElement<T extends string> {
    type: T;
    children: Descendant[];
}

export type CellElement = BaseElement<'cell'>;

export type CustomEditor =
    & BaseEditor
    & ReactEditor
    & HistoryEditor;

export type CustomElement =
    | CellElement;

export interface CustomText {
    text: string;
    bold?: boolean
    italic?: boolean
    underline?: boolean
}

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
