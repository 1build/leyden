import { CellRenderer } from 'datum-react';
import React from 'react';

export const UnitOfMeasureCell: CellRenderer<'UnitOfMeasure'> = ({
    attributes,
    children,
}) => {
    return (
        <span {...attributes} style={{ backgroundColor: 'yellow' }}>
            {children}
        </span>
    );
};
