import { Sheet } from 'datum';
import React, { FC, useMemo } from 'react';

import { Headers } from './Headers';
import {
    css,
    makeGridPositionClass,
    makeSheetGridTemplateClass,
} from './style';
import { RenderDatumElementProps } from '../types';

export const SheetRenderer: FC<RenderDatumElementProps<Sheet>> = ({
    attributes,
    children,
    element,
}) => {
    const sheetGridTemplateClass = useMemo(() => {
        const cols = element.genRowHeader ? element.cols+1 : element.cols;
        const rows = element.genColHeader ? element.rows+1 : element.rows;
        return makeSheetGridTemplateClass(cols, rows);
    }, [element.cols, element.rows, element.genColHeader, element.genRowHeader]);

    const hasOrigin = useMemo(() => (
        element.genColHeader && element.genRowHeader
    ), [element.genColHeader, element.genRowHeader]);

    const genHeaderClasses = useMemo(() => {
        const offset = hasOrigin ? 2 : 1;
        return {
            col: (pos: number) => ([
                makeGridPositionClass(pos+offset, 1),
                css.columnHeaderCell,
            ]),
            row: (pos: number) => ([
                makeGridPositionClass(1, pos+offset),
                css.rowHeaderCell,
            ]),
        };
    }, [hasOrigin]);

    return (
        <div
            className={[sheetGridTemplateClass, css.sheet].join(' ')}
            {...attributes}
        >
            {hasOrigin && <div className={css.originCell} />}
            {element.genColHeader && <Headers
                quantity={element.cols}
                genValue={element.genColHeader}
                genClasses={genHeaderClasses.col}
            />}
            {element.genRowHeader && <Headers
                quantity={element.rows}
                genValue={element.genRowHeader}
                genClasses={genHeaderClasses.row}
            />}
            {children}
        </div>
    );
};
