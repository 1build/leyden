import { CellRenderer } from 'leyden-react';
import React from 'react';

export const Name: CellRenderer<'Name'> = ({
    attributes,
    children,
}) => {
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
            {children}
        </div>
    );
};
