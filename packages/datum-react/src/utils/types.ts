import {
    Cell,
    CellType,
    Element,
    ElementType,
} from 'datum';
import { FC } from 'react';
import {
    RenderElementProps as RenderSlateElementProps
} from 'slate-react';

export type RenderElementProps<T extends ElementType> =
    & Omit<RenderSlateElementProps, 'element'>
    & { element: Element<T> };

export type ElementRenderer<T extends ElementType> = FC<RenderElementProps<T>>;

export type ElementRenderers = {
    [T in ElementType]: ElementRenderer<T>;
};

export type RenderCellProps<T extends CellType> =
    & Omit<RenderSlateElementProps, 'element'>
    & { element: Cell<T> };

export type CellRenderer<T extends CellType> = FC<RenderCellProps<T>>;

export type CellRenderers = {
    [T in CellType]: CellRenderer<T>;
};
