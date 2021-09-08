import { DatumText, FormattedText } from 'datum';
import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

export interface Leaf extends Omit<RenderLeafProps, 'leaf'|'text'> {
    leaf: DatumText;
    text: DatumText;
}

export const Leaf: FC<Leaf> = ({
    attributes,
    children,
    leaf,
}) => {
    if (FormattedText.isFormattedText(leaf) && leaf?.bold) {
        children = <strong>{children}</strong>;
    }

    return <span {...attributes}>{children}</span>;
};
