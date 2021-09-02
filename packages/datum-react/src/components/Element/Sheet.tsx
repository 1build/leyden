import { Sheet } from 'datum';
import React, { FC, useMemo } from 'react';

import {
    makeColumnHeaderCellClass,
    makeRowHeaderCellClass,
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
            class: makeColumnHeaderCellClass(i+columnHeaderOffset),
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
            class: makeRowHeaderCellClass(i+rowHeaderOffset),
            pos: i,
            val: genRowHeader(i),
        }));
    }, [element.genRowHeader, element.rows, hasOrigin]);

    return (
        <div
            className={className}
            {...attributes}
        >
            {hasOrigin && <div className={originCellClass} />}
            {columnHeaders.map(h => (
                <div key={h.pos} className={h.class}>{h.val}</div>
            ))}
            {rowHeaders.map(h => (
                <div key={h.pos} className={h.class}>{h.val}</div>
            ))}
            {children}
        </div>
    );
};
