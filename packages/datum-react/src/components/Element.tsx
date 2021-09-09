import {
    Cell as DatumCell,
    DatumElement,
    CustomElement as DatumCustomElement,
    Sheet as DatumSheet,
} from 'datum';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { Cell, CellRenderers } from './Cell';
import { CustomElement, CustomElementRenderers } from './CustomElement';
import { Sheet } from './Sheet';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    customElementRenderers: CustomElementRenderers;
    element: DatumElement;
}

export const Element: FC<Element> = ({
    attributes,
    cellRenderers,
    customElementRenderers,
    children,
    element,
}) => {
    if (DatumCell.isCell(element)) {
        return (
            <Cell
                cellRenderers={cellRenderers}
                attributes={attributes}
                element={element}
            >
                {children}
            </Cell>
        );
    }

    if (DatumCustomElement.isCustomElement(element)) {
        return (
            <CustomElement
                customElementRenderers={customElementRenderers}
                attributes={attributes}
                element={element}
            >
                {children}
            </CustomElement>
        );
    }

    if (DatumSheet.isSheet(element)) {
        return (
            <Sheet
                attributes={attributes}
                element={element}
            >
                {children}
            </Sheet>
        );
    }

    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
