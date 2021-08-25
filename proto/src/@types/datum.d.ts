declare module 'datum' {
    import { Descendant } from 'slate';

    /*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃ TEXT                                                  ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    interface BaseText<T extends string> {
        text: string;
        type: T;
    }

    export interface EmptyText extends BaseText<'emptyText'> {
        text: '';
    }
    export interface FormattedText extends BaseText<'formattedText'> {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    }

    /* Prototype
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    export type TextValues =
        | EmptyText
        | FormattedText;

    interface TextProto {
        isFormattedText: () => this is FormattedText;
    }

    export type Text = TextProto & TextValues;
    export type TypedText<T extends TextValues> = TextProto & T;

    /*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃ ELEMENT                                               ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    interface BaseElement<T extends string, C extends Descendant[]> {
        type: T;
        children: C;
    }

    /* Cell
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    type TableEmptyCell<T extends string> = BaseElement<T, [TypedText<EmptyText>]>;

    export type TableBodyCell = BaseElement<'tableBodyCell', [TypedText<FormattedText>]>;
    export interface TableColumnHeaderCell extends TableEmptyCell<'tableColumnHeaderCell'> {
        width: number|null;
    }
    export type TableOriginCell = TableEmptyCell<'tableOriginCell'>;
    export interface TableRowHeaderCell extends TableEmptyCell<'tableColumnRowCell'> {
        height: number|null;
    }

    /* Row
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    export type TableBodyRow = BaseElement<'tableBodyRow', [
        TypedElement<TableRowHeaderCell>,
        TypedElement<TableBodyCell>,
        ...TypedElement<TableBodyCell>[],
    ]>;
    export type TableHeaderRow = BaseElement<'tableHeaderRow', [
        TypedElement<TableOriginCell>,
        TypedElement<TableColumnHeaderCell>,
        ...TypedElement<TableColumnHeaderCell>[],
    ]>;

    /* Table
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
    export type Table = BaseElement<'table', [
        TypedElement<TableHeaderRow>,
        TypedElement<TableBodyRow>,
        ...TypedElement<TableBodyRow>[]
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

    export interface ElementProto {
        isTable: () => this is Table;
    }

    export type Element = ElementValues & ElementProto;
    export type TypedElement<T extends ElementValues> = ElementProto & T;
}
