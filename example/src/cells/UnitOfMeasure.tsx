import { CellRenderer } from 'leyden-react';
import React from 'react';

import { UOMString } from '../types';

export const UnitOfMeasure: CellRenderer<'UnitOfMeasure'> = ({
    attributes,
    children,
    element,
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
            }}
        >
            <span style={{
                color: '#000000',
                fontSize: 14,
                opacity: 0.8,
                fontWeight: 600,
                lineHeight: '14px',
            }}>
                {UOMString[element.uom]}
            </span>
            {children}
        </div>
    );
};
