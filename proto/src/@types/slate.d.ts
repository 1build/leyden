import { Descendant } from 'slate';

interface BaseElement<T extends string> {
    type: T;
    children: Descendant[];
}

export type CellElement = BaseElement<'cell'>;

export type CustomElement =
    | CellElement;

export interface CustomText {
    text: string;
    bold?: boolean
    italic?: boolean
    underline?: boolean
}

export type CustomEditor = HistoryEditor;

declare module 'slate' {
    interface CustomTypes {
        Element: CustomElement;
        Text: CustomText;
    }
}
