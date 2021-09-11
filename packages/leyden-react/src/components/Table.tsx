import { LeydenEditor, Table as LeydenTable } from 'leyden';
import React, { FC, useMemo } from 'react';
import { RenderElementProps, useSlateStatic } from 'slate-react';

import { Headers } from './Headers';
import {
    css,
    makeGridPositionClass,
    makeNestedSelectedCellClass,
    makeSheetGridTemplateClass,
} from './style';
import { notUndefined } from '../utils/typeGuards';

export interface Table extends Omit<RenderElementProps, 'element'> {
    element: LeydenTable;
}

export const Table: FC<Table> = ({
    attributes,
    children,
    element,
}) => {
    const editor = useSlateStatic();

    const { cols, rows, genColHeader, genRowHeader } = element;

    const sheetGridTemplateClass = useMemo(() => {
        const totalCols = genRowHeader ? cols+1 : cols;
        const totalRows = genColHeader ? rows+1 : rows;
        return makeSheetGridTemplateClass(totalCols, totalRows);
    }, [cols, rows, genColHeader, genRowHeader]);

    const hasOrigin = useMemo(() => (
        genColHeader && genRowHeader
    ), [genColHeader, genRowHeader]);

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

    const selectedCellClass = useMemo(() => {
        const selectedCoords = LeydenEditor.getSelectedCellCoords(editor);
        if (selectedCoords === null) {
            return null;
        }
        const nthEl = (selectedCoords.y*cols)+selectedCoords.x+1;
        return makeNestedSelectedCellClass(nthEl);
    }, [editor.selection, cols]);

    const className = useMemo(() => [
        css.sheet,
        selectedCellClass,
        sheetGridTemplateClass,
    ].filter(
        notUndefined
    ).join(
        ' '
    ), [sheetGridTemplateClass, selectedCellClass]);

    return (
        <div
            {...attributes}
            className={className}
        >
            {hasOrigin && <button className={css.originCell} />}
            {genColHeader && <Headers
                quantity={cols}
                genValue={genColHeader}
                genClasses={genHeaderClasses.col}
            />}
            {genRowHeader && <Headers
                quantity={rows}
                genValue={genRowHeader}
                genClasses={genHeaderClasses.row}
            />}
            {children}
        </div>
    );
};
