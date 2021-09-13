import { ElementRenderer } from 'leyden-react';
import React from 'react';

export const Default: ElementRenderer<'default'> = ({
    attributes,
    children,
}) => {
    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
