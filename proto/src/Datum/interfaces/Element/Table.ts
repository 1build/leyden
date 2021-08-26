import { Element } from 'slate';

import {
    BodyRow,
    DatumElement,
    ElementType,
    HeaderRow,
} from '.';

export type Table = DatumElement<ElementType.Table, [
    HeaderRow,
    BodyRow,
    ...BodyRow[],
]>;

export interface TableInterface {
    isTable: (value: any) => value is Table;
}

const isTable = (value: any): value is Table => (
    Element.isElement(value) && value.type === ElementType.Table
)

export const Table: TableInterface = {
    /**
     * Check if a value implements the `Table` interface.
     */

    isTable,
}
