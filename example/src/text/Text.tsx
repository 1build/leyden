import { TextRenderer } from 'leyden-react';
import React from 'react';

export const Text: TextRenderer<'Text'> = ({
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
            {children}
        </span>
    );
};
