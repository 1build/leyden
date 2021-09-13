import { CellRenderer } from 'leyden-react';
import React from 'react';

import { CSIColor, CSIString } from '../types';

export const CSI: CellRenderer<'CSI'> = ({
    attributes,
    children,
    element: { csi },
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
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '1.5rem',
                    padding: '0 0.75rem',
                    backgroundColor: CSIColor[csi],
                    borderRadius: 3,
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    lineHeight: '11px',
                    userSelect: 'none',
                }}
            >
                {CSIString[csi]}
            </span>
            {children}
        </div>
    );
};
