import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { CellRenderer } from './Cell';
import { TableRenderer } from './Table';
import { Cell, Row, Table } from '../..';

export const Element: FC<RenderElementProps> = ({
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
        return <>{children}</>;
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
