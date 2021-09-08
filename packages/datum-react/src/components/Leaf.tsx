import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

export type Leaf = RenderLeafProps;

export const Leaf: FC<Leaf> = ({
    attributes,
    children,
}) => {
    return <span {...attributes}>{children}</span>;
};
