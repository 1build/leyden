import { DatumEditor, Sheet } from 'datum';
import React, { FC, useMemo } from 'react';
import { useSlateStatic } from 'slate-react';

import { Headers } from './Headers';
import {
    css,
    makeGridPositionClass,
    makeNestedSelectedCellClass,
    makeSheetGridTemplateClass,
} from './style';
import { RenderDatumElementProps } from '../types';
import { notUndefined } from '../../../utils/typeGuards';

export type SheetRenderer<Cols extends number, Rows extends number> =
    RenderDatumElementProps<Sheet<Cols, Rows>>;

export const SheetRenderer = <Cols extends number, Rows extends number>({
    attributes,
    children,
    element,
}: SheetRenderer<Cols, Rows>): ReturnType<FC<SheetRenderer<Cols, Rows>>> => {
    const editor = useSlateStatic();

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

    const selectedCellClass = useMemo(() => {
        const selectedCoords = DatumEditor.getSelectedCellCoords(editor);
        if (selectedCoords === null) {
            return null;
        }
        const nthEl = (selectedCoords.y*element.cols)+selectedCoords.x+1;
        return makeNestedSelectedCellClass(nthEl);
    }, [editor.selection, element.cols]);

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
            className={className}
            {...attributes}
        >
            {hasOrigin && <button className={css.originCell} />}
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
