import { Cell, Table as LeydenTable } from 'leyden';
import React, { FC } from 'react';
import { Element as SlateElement } from 'slate';
import { RenderElementProps } from 'slate-react';

import { Table } from './Table';
import { CellRenderers, ElementRenderers } from '../utils/types';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    elementRenderers: ElementRenderers;
    element: SlateElement;
}

export const Element: FC<Element> = ({
    attributes,
    cellRenderers,
    elementRenderers,
    children,
    element,
}) => {
    if (Cell.isCell(element)) {
        const CellFC = cellRenderers[element.cellType];
        return (
            <CellFC
                attributes={attributes}
                element={element}
            >
                {children}
            </CellFC>
        );
    }
    
    if (LeydenTable.isTable(element)) {
        return (
            <Table
                attributes={attributes}
                element={element}
            >
                {children}
            </Table>
        );
    }

    const ElementFC = elementRenderers[element.type];
    return (
        <ElementFC
            attributes={attributes}
            element={element}
        >
            {children}
        </ElementFC>
    );
};
