import {
    EmptyText,
    FormattedText,
    TableColumnHeaderCell,
    TableRowHeaderCell,
    TableOriginCell,
    Table,
    TableBodyRow,
    TableHeaderRow,
} from 'datum';

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TEXT                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const emptyText: EmptyText = {
    text: '',
    type: 'emptyText',
};

const testeroo: [EmptyText] = [emptyText];

const formattedText: FormattedText = {
    text: 'someText',
    type: 'formattedText',
    bold: true,
};

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ CELL                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const originCell: TableOriginCell = {
    type: 'tableOriginCell',
    children: testeroo,
};

const columnHeaderCell: TableColumnHeaderCell = {
    type: 'tableColumnHeaderCell',
    children: [{ ...emptyText }],
};

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ ROW                                                   ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const blankBodyRow: TableBodyRow = {
    type: 'tableRow',
    children: [blankElement],
};

const headerRow: TableHeaderRow = {

};

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TABLE                                                 ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const blankTable: Table = {
    type: 'table',
    children: [{ ...blankRow }, { ...blankRow }],
};
