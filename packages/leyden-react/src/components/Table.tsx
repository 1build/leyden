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
import { HeaderRenderers, TableOptions } from '../utils/types';

export interface Table extends Omit<RenderElementProps, 'element'> {
    element: LeydenTable;
    headerRenderers?: HeaderRenderers;
    tableOptions?: Partial<TableOptions>;
}

export const Table: FC<Table> = ({
    attributes,
    children,
    element: table,
    headerRenderers,
    tableOptions,
}) => {
    const { columns, rows } = LeydenTable.dimensions(table);

    const style = useMemo(() => {
        const totalCols = headerRenderers?.row ? columns+1 : columns;
        return makeSheetGridTemplateStyle(
            totalCols,
            tableOptions?.cellGap??0,
        );
    }, [columns, headerRenderers]);

    const hasOrigin = useMemo(() => (
        headerRenderers?.column && headerRenderers?.row
    ), [headerRenderers]);

    const genHeaderStyles = useMemo(() => {
        const offset = hasOrigin ? 2 : 1;
        return {
            column: (pos: number) => {
                let colStyle = makeGridPositionStyle(pos+offset, 1);
                if (tableOptions?.stickyColumnHeaders) {
                    colStyle = { ...colStyle, ...stickyHeaderStyle };
                }
                return colStyle;
            },
            row: (pos: number) => makeGridPositionStyle(1, pos+offset),
        };
    }, [hasOrigin, tableOptions?.stickyColumnHeaders]);

    return (
        <div
            {...attributes}
            style={style}
        >
            {hasOrigin && <Origin Component={headerRenderers?.origin} />}
            {headerRenderers?.column && <Headers
                quantity={columns}
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
