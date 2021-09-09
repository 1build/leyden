import { CellRenderer } from 'datum-react';
import React from 'react';

export const QuantityCell: CellRenderer<'Quantity'> = ({
    attributes,
    children,
}) => {
    return (
        <span {...attributes} style={{ backgroundColor: 'red' }}>
            {children}
        </span>
    );
};
