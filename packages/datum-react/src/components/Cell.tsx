import { Cell as DatumCell, CellType } from 'datum';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { cellClass, css } from './style';

export type RenderCellProps<T extends CellType> =
    & Omit<RenderElementProps, 'element'>
    & { element: DatumCell<T> };

export type CellRenderer<T extends CellType> = FC<RenderCellProps<T>>;

export type CellRenderers = {
    [T in CellType]: CellRenderer<T>;
};

export interface Cell extends Omit<RenderElementProps, 'element'> {
    cellRenderers: CellRenderers;
    element: DatumCell<CellType>;
}

export const Cell: FC<Cell> = ({
    cellRenderers,
    children,
    element,
    ...props
}) => {
    const CellFC = cellRenderers[element.cellType];

    return (
        <div
            className={`${cellClass} ${css.cell}`}
        >
            <CellFC {...props} element={element}>
                {children}
            </CellFC>
        </div>
    );
};

