import { TextRenderer } from 'leyden-react';
import React from 'react';

export const Empty: TextRenderer<'Empty'> = ({
    attributes,
    children,
}) => {
    return (
        <span {...attributes}>
            {children}
        </span>
    );
};
