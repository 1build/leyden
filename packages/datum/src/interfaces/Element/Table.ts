import { Element } from 'slate';

import { Row, RowType } from './Row';
import { ElementType, TypedElement } from './types';

export type Table = TypedElement<ElementType.Table, [
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
