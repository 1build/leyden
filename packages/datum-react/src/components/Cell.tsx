import { Cell as DatumCell } from 'datum';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';


import { cellClass, css } from './style';

export interface Cell extends Omit<RenderElementProps, 'element'> {
    element: DatumCell;
}

export const Cell: FC<Cell> = ({
    attributes,
    children,
}) => {
    return (
        <div
            {...attributes}
            className={`${cellClass} ${css.cell}`}
        >
            {children}
        </div>
    );
};

