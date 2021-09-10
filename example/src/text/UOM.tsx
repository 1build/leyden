import { TextRenderer } from 'leyden-react';
import React from 'react';

import { UOMString } from '../types';

export const UOM: TextRenderer<'UOM'> = ({
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
            {UOMString[text.text]}
        </span>
    );
};
