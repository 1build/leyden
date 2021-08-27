import { Element } from 'slate';

import {
    DatumElement,
    ElementType,
    Row,
    RowType,
} from '.';

export type Table = DatumElement<ElementType.Table, [
    Row<RowType.Header>,
    Row<RowType.Body>,
    ...Row<RowType.Body>[],
]>;

const isTable = (value: Element): value is Table => (
    value.type === ElementType.Table
);

export const Table = {
    /**
     * Check if an element is a `Table`.
     */

    isTable,
};
