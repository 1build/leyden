import { Descendant } from 'slate';

export enum ElementType {
    Cell,
    Selection,
    Sheet,
}

export interface TypedElement<T extends ElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

export enum TextType {
    FormattedText,
    Void,
}

export interface TypedText<T extends TextType, C extends string=string> {
    type: T;
    text: C;
}

export enum Direction2D {
    Up,
    Right,
    Down,
    Left,
}
