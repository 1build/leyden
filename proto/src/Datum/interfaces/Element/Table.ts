import { Element } from 'slate';

import { DatumElement } from 'datum';

import {
    BodyRow,
    HeaderRow,
} from '.';

export type Table = DatumElement<'table', [
    HeaderRow,
    BodyRow,
    ...BodyRow[],
]>;

export interface TableInterface {
    isTable: (value: any) => value is Table;
}

const isTable = (value: any): value is Table => (
    Element.isElement(value) && value.type === 'table'
)

export const Table: TableInterface = {
    /**
     * Check if a value implements the `Table` interface.
     */

    isTable,
}
