import {
    Cell,
    ElementType,
    Sheet,
} from 'datum';

const randomNumericString = (): string => (
    Math.floor(Math.pow(Math.random()*100, 2)).toString(10)
);

const newFormattedText = () => ({
    text: randomNumericString(),
});

const newCSICell = (): Cell<'CSI'> => ({
    type: ElementType.Cell,
    cellType: 'CSI',
    children: [newFormattedText()],
    data: { div: 5 },
});

const newQuantityCell = (): Cell<'Quantity'> => ({
    type: ElementType.Cell,
    cellType: 'Quantity',
    children: [newFormattedText()],
    data: { quantity: 5 },
});

const newUnitOfMeasureCell = (): Cell<'UnitOfMeasure'> => ({
    type: ElementType.Cell,
    cellType: 'UnitOfMeasure',
    children: [newFormattedText()],
    data: { uom: 5 },
});

export const newSheet = (): Sheet<3, 4> => ({
    type: ElementType.Sheet,
    cols: 3,
    rows: 4,
    genColHeader: Sheet.genAlphabeticHeader,
    genRowHeader: Sheet.genNumericHeader,
    children: [
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
        newCSICell(), newQuantityCell(), newUnitOfMeasureCell(),
    ],
});
