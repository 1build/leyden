import { Descendant, Element } from 'slate';

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

interface AnyRow<T extends RowType, C extends Cell[]> extends DatumElement<ElementType.Cell, C> {
    rowType: RowType;
}

export type BodyRow = AnyRow<RowType.Body, [
    Cell<CellType.RowHeader>,
    Cell,
    ...Cell[],
]>;

export type HeaderRow = AnyRow<RowType.Header, [
    Cell<CellType.Origin>,
    Cell<CellType.ColumnHeader>,
    ...Cell<CellType.ColumnHeader>[],
]>;

export type Row =
    | BodyRow
    | HeaderRow;

export interface RowInterface {
    isBodyRow: (value: Row) => value is BodyRow;
    isHeaderRow: (value: Row) => value is HeaderRow;
    isRow: (value: any) => value is Row;
}

const isRow = (value: any): value is Row => (
    Element.isElement(value) && value.type === ElementType.Row
)

export const Row: RowInterface = {
    /**
     * Check if a row is a body row.
     */

    isBodyRow(value: Row): value is BodyRow {
        return value.rowType === RowType.Body;
    },

    /**
     * Check if a row is a header row.
     */

    isHeaderRow(value: Row): value is HeaderRow {
        return value.rowType === RowType.Header;
    },

    /**
     * Check if a value implements the `Row` interface.
     */

     isRow,
}
