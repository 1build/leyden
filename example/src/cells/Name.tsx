import { LeydenEditor } from 'leyden';
import {
    CellRenderer,
    ReactEditor,
    useRelativeCell,
} from 'leyden-react';
import React, { useEffect } from 'react';

export const Name: CellRenderer<'Name'> = ({
    attributes,
    children,
    element: cell,
}) => {
    const rowUomCell = useRelativeCell('UnitOfMeasure', cell, { x: 3 });

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
