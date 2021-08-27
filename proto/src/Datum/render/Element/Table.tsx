import React, { FC, useMemo } from 'react';

import { makeTableClass } from './style';
import { RenderDatumElementProps } from './types';

import { Table } from '../..';

export const TableRenderer: FC<RenderDatumElementProps<Table>> = ({
    attributes,
    children,
    element,
}) => {
    const className = useMemo(() => makeTableClass(
        element.children[0].children.length,
        element.children.length,
    ), [element.children.length, element.children[0].children.length]);

    return (
        <div
            className={className}
            {...attributes}
        >
            {children}
        </div>
    );
};
