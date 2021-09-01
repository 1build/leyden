import { FormattedText } from 'datum';
import React, { FC } from 'react';

import { RenderDatumLeafProps } from './types';

export const Leaf: FC<RenderDatumLeafProps> = ({
    attributes,
    children,
    leaf,
}) => {
    if (FormattedText.isFormattedText(leaf) && leaf?.bold) {
        children = <strong>{children}</strong>;
    }

    return <span {...attributes}>{children}</span>;
};
