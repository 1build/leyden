declare module 'datum' {
    import { Descendant } from 'slate';

    /*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃ TEXT                                                  ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    interface BaseText<T extends string> {
        text: string;
        type: T;
    }

    const formattedTextType = 'formattedText';
    export interface FormattedText extends BaseText<formattedTextType> {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    }

    export interface EmptyText extends BaseText<'emptyText'> {
        text: '';
    }

    export type TextValues =
        | EmptyText
        | FormattedText;

    const isFormattedText = (text: TextValues): text is FormattedText => (
        Reflect.get(text, 'type') === formattedTextType
    );

    export type Text = TextValues & {
        isFormattedText: () => this is FormattedText;
    }

    export const newText = (text: TextValues): Text => ({
        ...text,
        isFormattedText: () => isFormattedText(text),
    });

    /*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     ┃ ELEMENT                                               ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

    interface BaseElement<T extends string, C extends Descendant> {
        type: T;
        children: C[];
    }

    type TableEmptyCell<T extends string> = BaseElement<T, [EmptyText]>;

    export type TableOriginCell = TableEmptyCell<'tableOriginCell'>;
    export interface TableColumnHeaderCell extends TableEmptyCell<'tableColumnHeaderCell'> {
        width: number|null;
    }
    export interface TableRowHeaderCell extends TableEmptyCell<'tableColumnHeaderCell'> {
        height: number|null;
    }

    export type TableBodyCell = BaseElement<'tableCell', Descendant>;

    export type TableHeaderRow = BaseElement<'tableHeaderRow', [
        TableOriginCell,
        TableColumnHeaderCell,
        ...TableColumnHeaderCell,
    ]>;

    export type TableBodyRow = BaseElement<'tableRow', [
        TableRowHeaderCell,
        TableBodyCell,
        ...TableBodyCell,
    ]>;

    export type Table = BaseElement<'table', [
        TableHeaderRow,
        TableBodyRow,
        ...TableBodyRow
    ]>;

    export type Element =
        | TableOriginCell
        | TableColumnHeaderCell
        | TableRowHeaderCell;
}
