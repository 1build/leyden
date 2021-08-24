import { newElement, newText } from 'datum';

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TEXT                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const emptyText = newText({
    text: '',
    type: 'emptyText',
});

const formattedText = newText({
    text: 'someText',
    type: 'formattedText',
    bold: true,
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ CELL                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const columnHeaderCell = newElement({
    type: 'tableColumnHeaderCell',
    children: [{ ...emptyText }],
    width: null,
});

const originCell = newElement({
    type: 'tableOriginCell',
    children: [{ ...emptyText }],
});

const rowHeaderCell = newElement({
    type: 'tableColumnRowCell',
    children: [{ ...emptyText }],
    height: null,
});

const tableBodyCell = newElement({
    type: 'tableBodyCell',
    children: [{ ...formattedText }],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ ROW                                                   ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const headerRow = newElement({
    type: 'tableHeaderRow',
    children: [{ ...originCell }, { ...columnHeaderCell }, { ...columnHeaderCell }],
});

const bodyRow = newElement({
    type: 'tableBodyRow',
    children: [{ ...rowHeaderCell }, { ...tableBodyCell }, { ...tableBodyCell }],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TABLE                                                 ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export const blankTable = newElement({
    type: 'table',
    children: [{ ...headerRow }, { ...bodyRow }, { ...bodyRow }],
});
