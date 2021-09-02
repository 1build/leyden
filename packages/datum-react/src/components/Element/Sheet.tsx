import { Sheet } from 'datum';
import React, { FC, useMemo } from 'react';

import {
    makeSheetClass,
    originCellClass,
} from './style';
import { RenderDatumElementProps } from './types';

export const SheetRenderer: FC<RenderDatumElementProps<Sheet>> = ({
    attributes,
    children,
    element,
}) => {
    const className = useMemo(() => makeSheetClass(
        element.cols,
        element.rows,
    ), [element.cols, element.rows]);

    return (
        <div
            className={className}
            {...attributes}
        >
            {element.colHeaders && element.rowHeaders && <div className={originCellClass} />}
            {children}
        </div>
    );
};
