import React, { FC, useMemo } from 'react';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { RenderDatumElementProps } from './types';

import { Cell, CellType } from '../..';
import {
    columnHeaderCellClass,
    contentCellClass,
    rowHeaderCellClass,
    originCellClass,
} from './style';

export const CellRenderer: FC<RenderDatumElementProps<Cell>> = ({
    attributes,
    children,
    element,
}) => {
    const editor = useSlateStatic();

    const content = useMemo<{
        child?: string|number;
        class?: string;
    }>(() => {
        switch (element.cellType) {
            case CellType.Content:
                return {
                    class: contentCellClass,
                };
            case CellType.Origin:
                return {
                    child: '',
                    class: originCellClass,
                };
            case CellType.ColumnHeader: {
                const path = ReactEditor.findPath(editor, element);
                // Logic is slightly off - goes from "Z" to "BA" instead of "AA" 
                const cellPositionInRow = path[path.length-1]-1;
                const positionBase26 = cellPositionInRow.toString(26);
                let label = '';
                for (let i = 0; i < positionBase26.length; i++) {
                    const originalCharCode = positionBase26.charCodeAt(i);
                    let adjustedCharCode: number;
                    if (originalCharCode <= 57) {
                        adjustedCharCode = originalCharCode + 17;
                    } else {
                        adjustedCharCode = originalCharCode - 22;
                    }
                    label = `${label}${String.fromCharCode(adjustedCharCode)}`;
                }
                return {
                    child: label,
                    class: columnHeaderCellClass,
                };
            }
            case CellType.RowHeader: {
                const path = ReactEditor.findPath(editor, element);
                const rowPositionInTable = path[path.length-2];
                return {
                    child: rowPositionInTable.toString(),
                    class: rowHeaderCellClass,
                };
            }
            default:
                return {};
        }
    }, [element.cellType]);

    if (content.child === undefined) {
        return (
            <div
                {...attributes}
                className={content.class}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            {...attributes}
            contentEditable={false}
            className={content.class}
        >
            {content.child}
        </div>
    );
};

