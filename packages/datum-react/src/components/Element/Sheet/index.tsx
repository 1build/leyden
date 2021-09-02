import { Sheet } from 'datum';
import React, { FC, useMemo } from 'react';

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

    type headerInfo = {
        class: string,
        pos: number,
        val: string,
    }

    const hasOrigin = useMemo(() => (
        element.genColHeader && element.genRowHeader
    ), [element.genColHeader, element.genRowHeader]);

    const columnHeaders = useMemo<headerInfo[]>(() => {
        const genColHeader = element.genColHeader;
        if (!genColHeader) {
            return [];
        }
        const columnHeaderOffset = hasOrigin ? 2 : 1;
        return Array.from({ length: element.cols }, (_, i) => ({
            class: makeGridPositionClass(1, i+columnHeaderOffset),
            pos: i,
            val: genColHeader(i),
        }));
    }, [element.genColHeader, element.cols, hasOrigin]);

    const rowHeaders = useMemo<headerInfo[]>(() => {
        const genRowHeader = element.genRowHeader;
        if (!genRowHeader) {
            return [];
        }
        const rowHeaderOffset = hasOrigin ? 2 : 1;
        return Array.from({ length: element.rows }, (_, i) => ({
            class: makeGridPositionClass(i+rowHeaderOffset, 1),
            pos: i,
            val: genRowHeader(i),
        }));
    }, [element.genRowHeader, element.rows, hasOrigin]);

    return (
        <div
            className={[sheetGridTemplateClass, css.sheet].join(' ')}
            {...attributes}
        >
            {hasOrigin && <div className={css.originCell} />}
            {columnHeaders.map(h => (
                <div key={h.pos} className={[h.class, css.columnHeaderCell].join(' ')}>{h.val}</div>
            ))}
            {rowHeaders.map(h => (
                <div key={h.pos} className={[h.class, css.rowHeaderCell].join(' ')}>{h.val}</div>
            ))}
            {children}
        </div>
    );
};
