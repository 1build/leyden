import { Table as LeydenTable } from 'leyden';
import React, { FC, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';

import { Headers } from './Headers';
import { Origin } from './Origin';
import {
    makeGridPositionClass,
    makeSheetGridTemplateClass,
    stickyHeaderClass,
} from './style';
import { HeaderRenderers } from '../utils/types';

export interface TableOptions {
    cellGap: number;
    stickyColumnHeaders: boolean;
}

export interface Table extends Omit<RenderElementProps, 'element'> {
    element: LeydenTable;
    headerRenderers?: HeaderRenderers;
    options?: Partial<TableOptions>;
}

export const Table: FC<Table> = ({
    attributes,
    children,
    element,
    headerRenderers,
    options,
}) => {
    const { cols, rows } = element;

    const className = useMemo<string>(() => {
        const totalCols = headerRenderers?.row ? cols+1 : cols;
        return makeSheetGridTemplateClass(
            totalCols,
            options?.cellGap??0,
        );
    }, [cols, headerRenderers]);

    const hasOrigin = useMemo(() => (
        headerRenderers?.column && headerRenderers?.row
    ), [headerRenderers]);

    const genHeaderClass = useMemo(() => {
        const offset = hasOrigin ? 2 : 1;
        return {
            column: (pos: number) => {
                const classes = [makeGridPositionClass(pos+offset, 1)];
                if (options?.stickyColumnHeaders) {
                    classes.push(stickyHeaderClass);
                }
                return classes;
            },
            row: (pos: number) => ([makeGridPositionClass(1, pos+offset)]),
        };
    }, [hasOrigin, options?.stickyColumnHeaders]);

    return (
        <div
            {...attributes}
            className={className}
        >
            {hasOrigin && <Origin Component={headerRenderers?.origin} />}
            {headerRenderers?.column && <Headers
                quantity={cols}
                genClasses={genHeaderClass.column}
                Component={headerRenderers.column}
            />}
            {headerRenderers?.row && <Headers
                quantity={rows}
                genClasses={genHeaderClass.row}
                Component={headerRenderers.row}
            />}
            {children}
        </div>
    );
};
