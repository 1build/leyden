import { Table as LeydenTable } from 'leyden';
import React, { FC, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';

import { Headers } from './Headers';
import { Origin } from './Origin';
import {
    makeGridPositionClass,
    makeSheetGridTemplateClass,
} from './style';
import { HeaderRenderers } from '../utils/types';

export interface Table extends Omit<RenderElementProps, 'element'> {
    element: LeydenTable;
    headerRenderers?: HeaderRenderers;
}

export const Table: FC<Table> = ({
    attributes,
    children,
    element,
    headerRenderers,
}) => {
    const { cols, rows } = element;

    const className = useMemo<string>(() => {
        const totalCols = headerRenderers?.row ? cols+1 : cols;
        const totalRows = headerRenderers?.column ? rows+1 : rows;
        return makeSheetGridTemplateClass(
            totalCols,
            totalRows,
            '#D7E1E5',
            1,
        );
    }, [cols, rows, headerRenderers]);

    const hasOrigin = useMemo(() => (
        headerRenderers?.column && headerRenderers?.row
    ), [headerRenderers]);

    const genHeaderClass = useMemo(() => {
        const offset = hasOrigin ? 2 : 1;
        return {
            column: (pos: number) => (makeGridPositionClass(pos+offset, 1)),
            row: (pos: number) => (makeGridPositionClass(1, pos+offset)),
        };
    }, [hasOrigin]);

    return (
        <div
            {...attributes}
            className={className}
        >
            {hasOrigin && <Origin Component={headerRenderers?.origin} />}
            {headerRenderers?.column && <Headers
                quantity={cols}
                genClass={genHeaderClass.column}
                Component={headerRenderers.column}
            />}
            {headerRenderers?.row && <Headers
                quantity={rows}
                genClass={genHeaderClass.row}
                Component={headerRenderers.row}
            />}
            {children}
        </div>
    );
};
