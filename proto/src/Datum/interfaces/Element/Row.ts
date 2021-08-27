import { Element } from 'slate';

import {
    Cell,
    CellType,
    DatumElement,
    ElementType,
} from '.';

export enum RowType {
    Body,
    Header,
}

type RowMap = {
    [RowType.Body]: [
        Cell<CellType.RowHeader>,
        Cell<CellType.Content>,
        ...Cell<CellType.Content>[],
    ],
    [RowType.Header]: [
        Cell<CellType.Origin>,
        Cell<CellType.ColumnHeader>,
        ...Cell<CellType.ColumnHeader>[],
    ]
}

export interface Row<T extends RowType=RowType> extends DatumElement<ElementType.Row, RowMap[T]> {
    rowType: T;
}

const elementIsRow = (el: Element): el is Row<RowType> => (
    el.type === ElementType.Row
);

export const Row = {
    /**
     * Check if an element is a `Row`.
     * If `type` is passed, only return true if the passed value is a row of the specified type.
     */

    isRow: <T extends RowType>(
        el: Element,
        type?: T,
    ): el is Row<T extends RowType ? T : RowType> => (
        elementIsRow(el) && (type === undefined || el.rowType === type)
    )
};
