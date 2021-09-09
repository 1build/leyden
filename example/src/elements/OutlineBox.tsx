import { CustomElementRenderer } from 'datum-react';
import React from 'react';

export const OutlineBox: CustomElementRenderer<'OutlineBox'> = ({
    attributes,
    children,
}) => {
    return (
        <div {...attributes} style={{
            border: '1px solid black',
            margin: '0.25rem',
            padding: '0.25rem',
        }}>
            {children}
        </div>
    );
};
