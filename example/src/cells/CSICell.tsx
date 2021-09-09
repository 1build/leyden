import { CellRenderer } from 'datum-react';
import React from 'react';

export const CSICell: CellRenderer<'CSI'> = ({
    attributes,
    children,
}) => {
    return (
        <div {...attributes}>
            {children}
        </div>
    );
};