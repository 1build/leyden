import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

import { FormattedText } from '../..';

export const Leaf: FC<RenderLeafProps> = ({
    attributes,
    children,
    leaf,
}) => {
    if (FormattedText.isFormattedText(leaf) && leaf?.bold) {
        children = <strong>{children}</strong>;
    }

    return <div {...attributes}>{children}</div>;
};
