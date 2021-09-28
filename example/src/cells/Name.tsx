import {
    CellRenderer,
    useRelativeCell,
    useCellIsInSelectedColumn,
    useCellIsInSelectedRow,
} from 'leyden-react';
import React, { useEffect } from 'react';

export const Name: CellRenderer<'Name'> = ({
    attributes,
    children,
    element: cell,
}) => {
    const rowUomCell = useRelativeCell('UnitOfMeasure', cell, { x: 2 });

    const isInSelectedColumn = useCellIsInSelectedColumn(cell);
    const isInSelectedRow = useCellIsInSelectedRow(cell);

    /* eslint-disable no-console */
    useEffect(() => {
        if (isInSelectedRow) {
            console.log(`[R] SELECTED: ${cell.children[0].text}`);
        } else {
            console.log(`[R] DESELECTED: ${cell.children[0].text}`);
        }
    }, [isInSelectedRow]);

    useEffect(() => {
        if (isInSelectedColumn) {
            console.log(`[C] SELECTED: ${cell.children[0].text}`);
        } else {
            console.log(`[C] DESELECTED: ${cell.children[0].text}`);
        }
    }, [isInSelectedColumn]);
    /* eslint-enable no-console */

    return (
        <div
            {...attributes}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f6f8f8',
                height: '3rem',
                padding: '0 2.75rem 0 2.375rem',
                whiteSpace: 'nowrap',
            }}
        >
            {children} ({rowUomCell?.uom})
        </div>
    );
};
