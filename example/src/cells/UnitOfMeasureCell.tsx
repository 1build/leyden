import { CellRenderer } from 'datum-react';
import React from 'react';

export const UnitOfMeasureCell: CellRenderer<'UnitOfMeasure'> = ({
    attributes,
    children,
}) => {
    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
