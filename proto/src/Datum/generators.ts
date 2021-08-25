import {
    ElementValues,
    FormattedText,
    Table,
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


const isTable = (element: ElementValues): element is Table => (
    element.type === 'table'
);

export const newElement = <T extends ElementValues>(element: T): TypedElement<T> => ({
    ...element,
    isTable: () => isTable(element),
});
