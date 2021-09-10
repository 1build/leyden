import { CellRenderer } from 'leyden-react';
import React from 'react';

export const Text: CellRenderer<'Text'> = ({
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
                padding: '0 2.75rem 0 0.75rem',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </div>
    );
};
