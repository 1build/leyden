import {
    Cell,
    DatumElement,
    Element as DatumCustomElement,
    Sheet as DatumSheet,
} from 'datum';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { Sheet } from './Sheet';
import { CellRenderers, ElementRenderers } from '../utils/types';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    elementRenderers: ElementRenderers;
    element: DatumElement;
}

export const Element: FC<Element> = ({
    attributes,
    cellRenderers,
    elementRenderers,
    children,
    element,
}) => {
    if (Cell.isCell(element)) {
        const CellFC = cellRenderers[element.subType];
        return (
            <CellFC
                attributes={attributes}
                element={element}
            >
                {children}
            </CellFC>
        );
    }

    if (DatumCustomElement.isElement(element)) {
        const ElementFC = elementRenderers[element.subType];
        return (
            <ElementFC
                attributes={attributes}
                element={element}
            >
                {children}
            </ElementFC>
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
