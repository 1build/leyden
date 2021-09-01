import { Cell } from 'datum';
import React, { FC } from 'react';

import { RenderDatumElementProps } from './types';

import { contentCellClass } from './style';

export const CellRenderer: FC<RenderDatumElementProps<Cell>> = ({
    attributes,
    children,
}) => {
    return (
        <div
            {...attributes}
            className={contentCellClass}
        >
            {children}
        </div>
    );
};

