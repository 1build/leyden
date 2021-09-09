import { ElementRenderer } from 'datum-react';
import React from 'react';

import { CSIColor } from '../types';

export const ColorCodedCSI: ElementRenderer<'ColorCodedCSI'> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <div {...attributes} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '1.5rem',
            padding: '0 0.75rem',
            backgroundColor: CSIColor[element.children[0].data.value],
            borderRadius: 3,
        }}>
            {children}
        </div>
    );
};
