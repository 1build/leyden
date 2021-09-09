import { TextRenderer } from 'datum-react';
import React from 'react';

export const Decimal: TextRenderer<'Decimal'> = ({
    attributes,
    text,
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
            {text.data.value}
        </span>
    );
};
