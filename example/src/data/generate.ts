import { Text } from 'slate';
import {
    Cell,
    CustomElement,
    DatumElementType,
    Sheet,
} from 'datum';

const randomNumericString = (): string => (
    Math.floor(Math.pow(Math.random()*100, 2)).toString(10)
);

const newFormattedText = () => ({
    text: randomNumericString(),
});

const newColorBox = (children: Text[]): CustomElement<'ColorBox'> => ({
    type: DatumElementType.Element,
    subType: 'ColorBox',
    children,
    data: {
        color: ['blue', 'yellow', 'green'][Math.floor(Math.random()*3)]
    }
});

const newOutlineBox = (children: Text[]): CustomElement<'OutlineBox'> => ({
    type: DatumElementType.Element,
    subType: 'OutlineBox',
    children,
});

const newCSICell = (): Cell<'CSI'> => ({
    type: DatumElementType.Cell,
    subType: 'CSI',
    children: [newColorBox([newFormattedText()])],
    data: { div: 5 },
});

const newQuantityCell = (): Cell<'Quantity'> => ({
    type: DatumElementType.Cell,
    subType: 'Quantity',
    children: [newOutlineBox([newFormattedText()])],
    data: { quantity: 5 },
});

const newUnitOfMeasureCell = (): Cell<'UnitOfMeasure'> => ({
    type: DatumElementType.Cell,
    subType: 'UnitOfMeasure',
    children: [newFormattedText()],
    data: { uom: 5 },
});

const genColHeader = (col: number): string => {
    switch(col) {
        case 0:
            return 'CSI';
        case 1:
            return 'Quantity';
        case 2:
            return 'UOM';
        default:
            return Sheet.genAlphabeticHeader(col);
    }
};

export const newSheet = (): Sheet<3, 4> => ({
    type: DatumElementType.Sheet,
    cols: 3,
    rows: 4,
    genColHeader: genColHeader,
    genRowHeader: Sheet.genNumericHeader,
    children: [
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
    ],
});
