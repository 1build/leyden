import {
    Cell,
    Table as LeydenTable,
    Element as LeydenElement,
} from 'leyden';
import React, { FC } from 'react';
import { Element as SlateElement } from 'slate';
import { RenderElementProps } from 'slate-react';

import { Table, TableOptions } from './Table';
import {
    CellRenderers,
    ElementRenderers,
    HeaderRenderers,
} from '../utils/types';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    elementRenderers: ElementRenderers;
    element: SlateElement;
    headerRenderers?: HeaderRenderers;
    tableOptions?: TableOptions;
}

export const Element: FC<Element> = ({
    attributes: slateAttributes,
    cellRenderers,
    children,
    element,
    elementRenderers,
    headerRenderers,
    tableOptions,
}) => {
    const attributes = LeydenElement.isVoid(element)
        ? { ...slateAttributes, contentEditable: false }
        : slateAttributes;

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
                headerRenderers={headerRenderers}
                options={tableOptions}
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
