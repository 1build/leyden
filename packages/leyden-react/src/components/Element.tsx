import {
    Cell,
    LeydenElement,
    Element as LeydenCustomElement,
    Sheet as LeydenSheet,
} from 'leyden';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { Sheet } from './Sheet';
import { CellRenderers, ElementRenderers } from '../utils/types';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    elementRenderers: ElementRenderers;
    element: LeydenElement;
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

    if (LeydenCustomElement.isElement(element)) {
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

    if (LeydenSheet.isSheet(element)) {
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
