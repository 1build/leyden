import { TextRenderer } from 'datum-react';
import React from 'react';

import { CSIString } from '../types';

export const CSI: TextRenderer<'CSI'> = ({
    attributes,
    text,
}) => {
    return (
        <span
            {...attributes}
            style={{
                color: 'white',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                lineHeight: 11,
                userSelect: 'none',
            }}
        >
            {CSIString[text.text]}
        </span>
    );
};
