import {
    Cell,
    CellType,
    Element,
    ElementType,
    Text,
    TextType,
} from 'chalkboard';
import { FC } from 'react';
import {
    RenderElementProps as RenderSlateElementProps,
    RenderLeafProps,
} from 'slate-react';

export interface RenderElementProps<T extends ElementType> extends Omit<RenderSlateElementProps, 'element'> {
    element: Element<T>;
}

export type ElementRenderer<T extends ElementType> = FC<RenderElementProps<T>>;

export type ElementRenderers = {
    [T in ElementType]: ElementRenderer<T>;
};

export interface RenderCellProps<T extends CellType> extends Omit<RenderSlateElementProps, 'element'> {
    element: Cell<T>;
}

export type CellRenderer<T extends CellType> = FC<RenderCellProps<T>>;

export type CellRenderers = {
    [T in CellType]: CellRenderer<T>;
};

export interface RenderTextProps<T extends TextType> extends Omit<RenderLeafProps, 'leaf'|'text'> {
    leaf: Text<T>;
    text: Text<T>;
}

export type TextRenderer<T extends TextType> = FC<RenderTextProps<T>>;

export type TextRenderers = {
    [T in TextType]: TextRenderer<T>;
};
