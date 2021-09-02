import {
    Cell,
    ElementType,
    FormattedText,
    Sheet,
    TextType,
} from 'datum';

const randomNumericString = (): string => (
    Math.floor(Math.pow(Math.random()*100, 2)).toString(10)
);

const newFormattedText = (): FormattedText => ({
    text: randomNumericString(),
    type: TextType.FormattedText,
});

const newCell = (): Cell => ({
    type: ElementType.Cell,
    children: [newFormattedText()],
});

export const newSheet = (
    cols: number,
    rows: number,
): Sheet => ({
    type: ElementType.Sheet,
    cols,
    rows,
    genColHeader: Sheet.genAlphabeticHeader,
    genRowHeader: Sheet.genNumericHeader,
    children: [
        ...(Array.from({ length: cols*rows }, newCell)),
    ],
});
