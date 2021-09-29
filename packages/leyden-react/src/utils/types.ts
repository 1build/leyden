import {
    Cell,
    CellIsExtended,
    CellType,
    Element,
    ElementIsExtended,
    ExternalElementType,
    Text,
    TextIsExtended,
    TextType,
} from 'leyden';
import { FC } from 'react';
import {
    RenderElementProps as RenderSlateElementProps,
    RenderLeafProps,
} from 'slate-react';

export type RenderElementAttributes = RenderSlateElementProps['attributes'] & {
    contentEditable?: boolean;
}

type KeptRenderElementProps = Omit<RenderSlateElementProps, 'attributes'|'element'>;

export interface RenderElementProps<T extends ExternalElementType> extends KeptRenderElementProps {
    attributes: RenderElementAttributes;
    element: Element<T>;
}

export type ElementRenderer<T extends ExternalElementType> = FC<RenderElementProps<T>>;

export type ElementRenderers = {
    [T in ExternalElementType]: ElementRenderer<T>;
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

export interface HeaderRendererProps {
    position: number;
}

export type HeaderRenderer = FC<HeaderRendererProps>;

export interface HeaderRenderers {
    column?: FC<HeaderRendererProps>;
    origin?: FC;
    row?: FC<HeaderRendererProps>;
}

export interface TableOptions {
    cellGap: number;
    stickyColumnHeaders: boolean;
}

export type CellRenderersOption = CellIsExtended extends true
    ? { cellRenderers: CellRenderers }
    : { cellRenderers?: undefined };

export type ElementRenderersOption = ElementIsExtended extends true
    ? { elementRenderers: ElementRenderers }
    : { elementRenderers?: undefined };

export type TextRenderersOption = TextIsExtended extends true
    ? { textRenderers: TextRenderers }
    : { textRenderers?: undefined };
