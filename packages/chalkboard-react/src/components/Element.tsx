import {
    Cell,
    ChalkboardElement,
    Element as ChalkboardCustomElement,
    Sheet as ChalkboardSheet,
} from 'chalkboard';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { Sheet } from './Sheet';
import { CellRenderers, ElementRenderers } from '../utils/types';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    elementRenderers: ElementRenderers;
    element: ChalkboardElement;
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

    if (ChalkboardCustomElement.isElement(element)) {
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

    if (ChalkboardSheet.isSheet(element)) {
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
