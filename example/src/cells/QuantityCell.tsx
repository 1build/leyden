import { CellRenderer } from 'datum-react';
import React from 'react';

export const QuantityCell: CellRenderer<'Quantity'> = ({
    attributes,
    children,
}) => {
    return (
        <div {...attributes} style={{ backgroundColor: 'red' }}>
            {children}
        </div>
    );
};
