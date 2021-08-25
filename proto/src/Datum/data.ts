import { Table, TypedElement } from 'datum';

import { newElement, newText } from '@/Datum/generators';

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TEXT                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const randomNumericString = (): string => (
    Math.floor(Math.pow(Math.random()*100, 2)).toString(10)
);

const newEmptyText = () => newText({
    text: '',
    type: 'emptyText',
});

const newFormattedText = () => newText({
    text: randomNumericString(),
    type: 'formattedText',
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ CELL                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const newColumnHeaderCell = () => newElement({
    type: 'tableColumnHeaderCell',
    children: [newEmptyText()],
    width: null,
});

const newOriginCell = () => newElement({
    type: 'tableOriginCell',
    children: [newEmptyText()],
});

const newRowHeaderCell = () => newElement({
    type: 'tableRowHeaderCell',
    children: [newEmptyText()],
    height: null,
});

const newTableBodyCell = () => newElement({
    type: 'tableBodyCell',
    children: [newFormattedText()],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ ROW                                                   ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const newHeaderRow = (columns: number) => newElement({
    type: 'tableHeaderRow',
    children: [
        newOriginCell(),
        newColumnHeaderCell(),
        ...(Array.from({ length: columns-2 }, newColumnHeaderCell)),
    ],
});

const newBodyRow = (columns: number) => newElement({
    type: 'tableBodyRow',
    children: [
        newRowHeaderCell(),
        newTableBodyCell(),
        ...(Array.from({ length: columns-2 }, newTableBodyCell)),
    ],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TABLE                                                 ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export const newMockTable = (
    columns: number,
    rows: number,
): TypedElement<Table> => newElement({
    type: 'table',
    children: [
        newHeaderRow(columns),
        newBodyRow(columns),
        ...(Array.from({ length: rows-1 }, () => newBodyRow(columns))),
    ],
});
