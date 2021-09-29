import {
    Cell,
    Table as LeydenTable,
    Element as LeydenElement,
} from 'leyden';
import React, { FC } from 'react';
import { Element as SlateElement } from 'slate';
import { DefaultElement, RenderElementProps } from 'slate-react';

import { Table } from './Table';
import {
    CellRenderers,
    ElementRenderers,
    HeaderRenderers,
    TableOptions,
} from '../utils/types';

export interface Element extends Omit<RenderElementProps, 'element'> {
    cellRenderers?: CellRenderers;
    elementRenderers?: ElementRenderers;
    element: SlateElement;
    headerRenderers?: HeaderRenderers;
    tableOptions?: Partial<TableOptions>;
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
    
    const renderDefaultElement = (): JSX.Element => (
        <DefaultElement
            attributes={attributes}
            element={element}
        >
            {children}
        </DefaultElement>
    );

    if (Cell.isCell(element)) {
        if (!cellRenderers) {
            return renderDefaultElement();
        }
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
                tableOptions={tableOptions}
            >
                {children}
            </Table>
        );
    }

    if (!elementRenderers) {
        return renderDefaultElement();
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
