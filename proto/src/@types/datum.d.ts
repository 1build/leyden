declare module 'datum' {
    /*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃ TEXT                                                  ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    interface BaseText<T extends string> {
        text: string;
        type: T;
    }

    const emtpyTextType = 'emptyText';
    const formattedTextType = 'formattedText';

    export interface EmptyText extends BaseText<emtpyTextType> {
        text: '';
    }
    export interface FormattedText extends BaseText<formattedTextType> {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    }

    export type TextValues =
        | EmptyText
        | FormattedText;

    /* Prototype
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    const isFormattedText = (text: TextValues): text is FormattedText => (
        Reflect.get(text, 'type') === formattedTextType
    );

    export type TextProto = {
        isFormattedText: () => this is FormattedText;
    }

    export type Text = TextProto & TextValues;

    export const newText = <T extends TextValues>(text: T): T & TextProto => ({
        ...text,
        isFormattedText: () => isFormattedText(text),
    });

    /*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃ ELEMENT                                               ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    interface BaseElement<T extends string, C extends Array<BaseElement|Text>> {
        type: T;
        children: C;
    }

    /* Cell
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    type TableEmptyCell<T extends string> = BaseElement<T, [EmptyText]>;

    const tableBodyCellType = 'tableBodyCell';
    const tableColumnHeaderCellType = 'tableColumnHeaderCell';
    const tableColumnRowCellType = 'tableColumnRowCell';
    const tableOriginCellType = 'tableOriginCell';

    export type TableBodyCell = BaseElement<tableBodyCellType, [FormattedText]>;
    export interface TableColumnHeaderCell extends TableEmptyCell<tableColumnHeaderCellType> {
        width: number|null;
    }
    export type TableOriginCell = TableEmptyCell<tableOriginCellType>;
    export interface TableRowHeaderCell extends TableEmptyCell<tableColumnRowCellType> {
        height: number|null;
    }

    /* Row
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    const tableBodyRowType = 'tableBodyRow';
    const tableHeaderRowType = 'tableHeaderRow';

    export type TableBodyRow = BaseElement<tableBodyRowType, [
        TableRowHeaderCell,
        TableBodyCell,
        ...TableBodyCell,
    ]>;
    export type TableHeaderRow = BaseElement<tableHeaderRowType, [
        TableOriginCell,
        TableColumnHeaderCell,
        ...TableColumnHeaderCell,
    ]>;

    /* Table
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    const tableType = 'table';

    export type Table = BaseElement<tableType, [
        TableHeaderRow,
        TableBodyRow,
        ...TableBodyRow
    ]>;

    /* Prototype
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    export type ElementValues =
        | Table
        | TableBodyCell
        | TableBodyRow
        | TableColumnHeaderCell
        | TableHeaderRow
        | TableRowHeaderCell
        | TableOriginCell;

    export type ElementProto = {
    }

    export type Element = ElementValues & ElementProto;

    export const newElement = <T extends ElementValues>(element: T): T & ElementProto => ({
        ...element,
    });
}
