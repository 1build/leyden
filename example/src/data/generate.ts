import {
    Cell,
    ElementType,
    FormattedText,
    Multiply,
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

export const newSheet = <Cols extends number, Rows extends number>(
    cols: Cols,
    rows: Rows,
    totalCells: Multiply<Cols, Rows>,
): Sheet<Cols, Rows> => {
    const cells = Array.from({ length: totalCells }, newCell);
    if (!Sheet.cellsFitSheet(cells, totalCells)) {
        throw new Error(`Wrong cell length (expected ${cols*rows}, got ${cells.length}`);
    }
    return {
        type: ElementType.Sheet,
        cols,
        rows,
        genColHeader: Sheet.genAlphabeticHeader,
        genRowHeader: Sheet.genNumericHeader,
        children: cells,
    };
};

export const newExplicitSheet = (): Sheet<3, 4> => ({
    type: ElementType.Sheet,
    cols: 3,
    rows: 4,
    genColHeader: Sheet.genAlphabeticHeader,
    genRowHeader: Sheet.genNumericHeader,
    children: [
        newCell(), newCell(), newCell(),
        newCell(), newCell(), newCell(),
        newCell(), newCell(), newCell(),
        newCell(), newCell(), newCell(),
    ],
});
