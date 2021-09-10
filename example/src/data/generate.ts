import {
    Cell,
    Element,
    LeydenElementType,
    Sheet,
    Text,
} from 'leyden';

import { CSI, UOM } from '../types';

const newCSIText = (text: CSI): Text<'CSI'> => ({
    type: 'CSI',
    validator: 'csi',
    text,
});

const newDecimalText = (value: number): Text<'Decimal'> => ({
    type: 'Decimal',
    validator: 'numeric',
    text: value.toString(),
});

const newUOMText = (text: UOM): Text<'UOM'> => ({
    type: 'UOM',
    validator: 'uom',
    text,
});

const newWholeDollarsText = (value: number): Text<'WholeDollars'> => ({
    type: 'WholeDollars',
    validator: 'integer',
    text: value.toString(),
});

const newColorCodedCSIElement = (value: CSI): Element<'ColorCodedCSI'> => ({
    type: LeydenElementType.Element,
    subType: 'ColorCodedCSI',
    children: [newCSIText(value)],
});

const newCSICell = (value: CSI): Cell<'CSI'> => ({
    type: LeydenElementType.Cell,
    subType: 'CSI',
    children: [newColorCodedCSIElement(value)],
});

const newQuantityCell = (value: number): Cell<'Quantity'> => ({
    type: LeydenElementType.Cell,
    subType: 'Quantity',
    children: [newDecimalText(value)],
});

const newTotalCell = (value: number): Cell<'Total'> => ({
    type: LeydenElementType.Cell,
    subType: 'Total',
    children: [newWholeDollarsText(value)],
});

const newUnitOfMeasureCell = (value: UOM): Cell<'UnitOfMeasure'> => ({
    type: LeydenElementType.Cell,
    subType: 'UnitOfMeasure',
    children: [newUOMText(value)],
});

const genColHeader = (col: number): string => {
    switch(col) {
        case 0:
            return 'Quantity';
        case 1:
            return 'UOM';
        case 2:
            return 'CSI';
        case 3:
            return 'Total';
        default:
            return Sheet.genAlphabeticHeader(col);
    }
};

export const newSheet = (): Sheet<4, 6> => ({
    type: LeydenElementType.Sheet,
    cols: 4,
    rows: 6,
    genColHeader: genColHeader,
    children: [
        newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.Div09), newTotalCell(15730),
        newQuantityCell(84), newUnitOfMeasureCell(UOM.ManHour), newCSICell(CSI.Div09), newTotalCell(15730),
        newQuantityCell(8), newUnitOfMeasureCell(UOM.Gallons), newCSICell(CSI.Div09), newTotalCell(15730),
        newQuantityCell(2404.8), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.WoodAndPlastics), newTotalCell(15730),
        newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.ThermalAndMoisture), newTotalCell(15730),
        newQuantityCell(12), newUnitOfMeasureCell(UOM.Each), newCSICell(CSI.DoorsAndWindows), newTotalCell(15730),
    ],
});
