import {
    ElementValues,
    FormattedText,
    TextValues,
    TypedElement,
    TypedText,
} from 'datum';

const isFormattedText = (text: TextValues): text is FormattedText => (
    Reflect.get(text, 'type') === 'formattedText'
);

export const newText = <T extends TextValues>(text: T): TypedText<T> => ({
    ...text,
    isFormattedText: () => isFormattedText(text),
});

export const newElement = <T extends ElementValues>(element: T): TypedElement<T> => ({
    ...element,
    isColumnHeaderCell: () => element.type === 'tableColumnHeaderCell',
    isRowHeaderCell: () => element.type === 'tableRowHeaderCell',
    isRow: () => ['tableBodyRow', 'tableHeaderRow'].includes(element.type),
    isTable: () => element.type === 'table',
    isTableBodyCell: () => element.type === 'tableBodyCell',
});
