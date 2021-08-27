import React, { CSSProperties, FC, useMemo } from 'react';
import { RenderDatumElementProps } from './types';

import { Table } from '../..';

export const TableRenderer: FC<RenderDatumElementProps<Table>> = ({
    attributes,
    children,
    element,
}) => {
    const style = useMemo<CSSProperties>(() => {
        const columnCount = element.children[0].children.length;
        const rowCount = element.children.length;

        return {
            display: 'grid',
            gridTemplateColumns: `fit-content(1.5rem) repeat(${columnCount-1}, auto)`,
            gridTemplateRows: `repeat(${rowCount}, auto)`,
            gap: '1px',
            backgroundColor: 'rgba(100, 100, 100, 0.2)',
            alignItems: 'stretch',
            justifyItems: 'stretch',
            width: 'fit-content',
            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
        };
    }, [element.children.length, element.children[0].children.length]);

    return (
        <div
            style={style}
            {...attributes}
        >
            {children}
        </div>
    );
};
