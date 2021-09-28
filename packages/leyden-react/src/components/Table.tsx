import { Table as LeydenTable } from 'leyden';
import React, { FC, useMemo } from 'react';
import { RenderElementProps } from 'slate-react';

import { Headers } from './Headers';
import { Origin } from './Origin';
import {
    makeGridPositionStyle,
    makeSheetGridTemplateStyle,
    stickyHeaderStyle,
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

    const style = useMemo(() => {
        const totalCols = headerRenderers?.row ? cols+1 : cols;
        return makeSheetGridTemplateStyle(
            totalCols,
            options?.cellGap??0,
        );
    }, [cols, headerRenderers]);

    const hasOrigin = useMemo(() => (
        headerRenderers?.column && headerRenderers?.row
    ), [headerRenderers]);

    const genHeaderStyles = useMemo(() => {
        const offset = hasOrigin ? 2 : 1;
        return {
            column: (pos: number) => {
                let colStyle = makeGridPositionStyle(pos+offset, 1);
                if (options?.stickyColumnHeaders) {
                    colStyle = { ...colStyle, ...stickyHeaderStyle };
                }
                return colStyle;
            },
            row: (pos: number) => makeGridPositionStyle(1, pos+offset),
        };
    }, [hasOrigin, options?.stickyColumnHeaders]);

    return (
        <div
            {...attributes}
            style={style}
        >
            {hasOrigin && <Origin Component={headerRenderers?.origin} />}
            {headerRenderers?.column && <Headers
                quantity={cols}
                genStyle={genHeaderStyles.column}
                Component={headerRenderers.column}
            />}
            {headerRenderers?.row && <Headers
                quantity={rows}
                genStyle={genHeaderStyles.row}
                Component={headerRenderers.row}
            />}
            {children}
        </div>
    );
};
