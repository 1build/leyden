/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TEXT                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const randomNumericString = (): string => (
    Math.floor(Math.pow(Math.random()*100, 2)).toString(10)
);

const newEmptyText = () => ({
    text: '',
    type: 'emptyText',
});

const newFormattedText = () => ({
    text: randomNumericString(),
    type: 'formattedText',
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ CELL                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const newColumnHeaderCell = () => ({
    type: 'tableColumnHeaderCell',
    children: [newEmptyText()],
    width: null,
});

const newOriginCell = () => ({
    type: 'tableOriginCell',
    children: [newEmptyText()],
});

const newRowHeaderCell = () => ({
    type: 'tableRowHeaderCell',
    children: [newEmptyText()],
    height: null,
});

const newTableBodyCell = () => ({
    type: 'tableBodyCell',
    children: [newFormattedText()],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ ROW                                                   ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const newHeaderRow = (columns: number) => ({
    type: 'tableHeaderRow',
    children: [
        newOriginCell(),
        newColumnHeaderCell(),
        ...(Array.from({ length: columns-2 }, newColumnHeaderCell)),
    ],
});

const newBodyRow = (columns: number) => ({
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
) => ({
    type: 'table',
    children: [
        newHeaderRow(columns),
        newBodyRow(columns),
        ...(Array.from({ length: rows-1 }, () => newBodyRow(columns))),
    ],
});
