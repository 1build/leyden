import { CellRenderer } from 'leyden-react';
import React from 'react';

export const UnitOfMeasure: CellRenderer<'UnitOfMeasure'> = ({
    attributes,
    children,
}) => {
    return (
        <div
            {...attributes}
            contentEditable={false}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f6f8f8',
                height: '3rem',
                padding: '0 2.75rem 0 0.75rem',
            }}
        >
            {children}
        </div>
    );
};
