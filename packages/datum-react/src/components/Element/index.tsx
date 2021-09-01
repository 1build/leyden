import { Cell, Row, Table } from 'datum';
import React, { FC } from 'react';

import { CellRenderer } from './Cell';
import { RowRenderer } from './Row';
import { TableRenderer } from './Table';
import { RenderDatumElementProps } from './types';

export const Element: FC<RenderDatumElementProps> = ({
    attributes,
    children,
    element,
}) => {
    if (Cell.isCell(element)) {
        return (
            <CellRenderer attributes={attributes} element={element}>
                {children}
            </CellRenderer>
        );
    }

    if (Row.isRow(element)) {
        return (
            <RowRenderer attributes={attributes} element={element}>
                {children}
            </RowRenderer>
        );
    }

    if (Table.isTable(element)) {
        return (
            <TableRenderer attributes={attributes} element={element}>
                {children}
            </TableRenderer>
        );
    }

    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
