import { Cell } from 'datum';
import React, { FC } from 'react';

import { RenderDatumElementProps } from '../types';

import { cellClass, css } from './style';

export const CellRenderer: FC<RenderDatumElementProps<Cell>> = ({
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

