import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

export const Element: FC<RenderElementProps> = ({
    attributes,
    children,
}) => {
    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
