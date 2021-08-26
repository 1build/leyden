import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

export const Leaf: FC<RenderLeafProps> = ({
    attributes,
    children,
    leaf,
}) => {
    if (leaf.isFormattedText() && leaf?.bold) {
        children = <strong>{children}</strong>;
    }

    return <span {...attributes}>{children}</span>;
};
