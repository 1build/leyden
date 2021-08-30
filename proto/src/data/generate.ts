import {
    Cell,
    CellType,
    ElementType,
    FormattedText,
    Row,
    RowType,
    Table,
    TextType,
    Void,
} from 'datum';

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TEXT                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const randomNumericString = (): string => (
    Math.floor(Math.pow(Math.random()*100, 2)).toString(10)
);

const newVoidText = (): Void => ({
    text: '',
    type: TextType.Void,
});

const newFormattedText = (): FormattedText => ({
    text: randomNumericString(),
    type: TextType.FormattedText,
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ CELL                                                  ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const newColumnHeaderCell = (): Cell<CellType.ColumnHeader> => ({
    type: ElementType.Cell,
    cellType: CellType.ColumnHeader,
    children: [newVoidText()],
    width: null,
});

const newOriginCell = (): Cell<CellType.Origin> => ({
    type: ElementType.Cell,
    cellType: CellType.Origin,
    children: [newVoidText()],
});

const newRowHeaderCell = (): Cell<CellType.RowHeader> => ({
    type: ElementType.Cell,
    cellType: CellType.RowHeader,
    children: [newVoidText()],
    height: null,
});

const newTableContentCell = (): Cell<CellType.Content> => ({
    type: ElementType.Cell,
    cellType: CellType.Content,
    children: [newFormattedText()],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ ROW                                                   ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

const newHeaderRow = (columns: number): Row<RowType.Header> => ({
    type: ElementType.Row,
    rowType: RowType.Header,
    children: [
        newOriginCell(),
        newColumnHeaderCell(),
        ...(Array.from({ length: columns-2 }, newColumnHeaderCell)),
    ],
});

const newBodyRow = (columns: number): Row<RowType.Body> => ({
    type: ElementType.Row,
    rowType: RowType.Body,
    children: [
        newRowHeaderCell(),
        newTableContentCell(),
        ...(Array.from({ length: columns-2 }, newTableContentCell)),
    ],
});

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ TABLE                                                 ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

export const newMockTable = (
    columns: number,
    rows: number,
): Table => ({
    type: ElementType.Table,
    children: [
        newHeaderRow(columns),
        newBodyRow(columns),
        ...(Array.from({ length: rows-1 }, () => newBodyRow(columns))),
    ],
});
