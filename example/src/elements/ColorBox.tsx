import { CustomElementRenderer } from 'datum-react';
import React from 'react';

export const ColorBox: CustomElementRenderer<'ColorBox'> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <div {...attributes} style={{
            backgroundColor: element.data.color,
            margin: '0.25rem',
            padding: '0.25rem',
        }}>
            {children}
        </div>
    );
};
