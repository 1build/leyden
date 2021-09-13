import { TextRenderer } from 'leyden-react';
import React from 'react';

import { CSIColor, CSIString } from '../types';

export const CSI: TextRenderer<'CSI'> = ({
    attributes,
    text,
}) => {
    return (
        <div {...attributes} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '1.5rem',
            padding: '0 0.75rem',
            backgroundColor: CSIColor[text.csi],
            borderRadius: 3,
        }}>
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
                {CSIString[text.csi]}
            </span>
        </div>
    );
};
