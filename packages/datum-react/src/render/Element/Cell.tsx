import { Cell, CellType } from 'datum';
import React, { FC, useMemo } from 'react';
import { useSlateStatic } from 'slate-react';
import { RenderDatumElementProps } from './types';

import { notUndefined } from './helpers';

import {
    columnHeaderCellClass,
    contentCellClass,
    rowHeaderCellClass,
    selectedCellClass,
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
                // const cellPositionInRow = Cell.getCoordinates(editor, element).x-1;
                // const positionBase26 = cellPositionInRow.toString(26);
                // let label = '';
                // for (let i = 0; i < positionBase26.length; i++) {
                //     const originalCharCode = positionBase26.charCodeAt(i);
                //     let adjustedCharCode: number;
                //     if (originalCharCode <= 57) {
                //         adjustedCharCode = originalCharCode + 17;
                //     } else {
                //         adjustedCharCode = originalCharCode - 22;
                //     }
                //     if (i < positionBase26.length-1) {
                //         adjustedCharCode -= 1;
                //     }
                //     label = `${label}${String.fromCharCode(adjustedCharCode)}`;
                // }
                return {
                    child: 'A',
                    class: columnHeaderCellClass,
                };
            }
            case CellType.RowHeader: {
                // const rowPositionInTable = Cell.getCoordinates(editor, element).y;
                // const label = rowPositionInTable.toString();
                return {
                    child: '1',
                    class: rowHeaderCellClass,
                };
            }
            default:
                return {};
        }
    }, [editor, element.cellType]);

    const selected = useMemo(() => {
        return false;
        // return editor.selection !== null && Path.isChild(
        //     editor.selection.focus.path,
        //     DatumElement.getPath(editor, element)
        // );
    }, [editor.selection?.focus.path]);

    const classes = useMemo(() => ([
        selected ? selectedCellClass : undefined,
        content.class,
    ].filter(notUndefined).join(' ')), [content.class, selected]);

    if (content.child === undefined) {
        return (
            <div
                {...attributes}
                className={classes}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            {...attributes}
            className={classes}
        >
            {content.child}
        </div>
    );
};
