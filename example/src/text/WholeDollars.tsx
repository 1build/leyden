import { TextRenderer } from 'leyden-react';
import React from 'react';

export const WholeDollars: TextRenderer<'WholeDollars'> = ({
    attributes,
    children,
}) => {
    return (
        <span
            {...attributes}
            style={{
                color: '#000000',
                fontSize: 14,
                opacity: 0.8,
                fontWeight: 600,
                lineHeight: '14px',
            }}
        >
            <span contentEditable={false}>$</span>
            {children}
        </span>
    );
};
