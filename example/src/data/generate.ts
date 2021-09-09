import {
    Cell,
    Element,
    DatumElementType,
    Sheet,
    Text,
} from 'datum';

import { CSI, UOM } from '../types';

const newCSIText = (value: CSI): Text<'CSI'> => ({
    type: 'CSI',
    text: '',
    data: { value },
});

const newDecimalText = (value: number): Text<'Decimal'> => ({
    type: 'Decimal',
    text: '',
    data: { value },
});

const newUOMText = (value: UOM): Text<'UOM'> => ({
    type: 'UOM',
    text: '',
    data: { value },
});

const newColorCodedCSIElement = (value: CSI): Element<'ColorCodedCSI'> => ({
    type: DatumElementType.Element,
    subType: 'ColorCodedCSI',
    children: [newCSIText(value)],
});

const newCSICell = (value: CSI): Cell<'CSI'> => ({
    type: DatumElementType.Cell,
    subType: 'CSI',
    children: [newColorCodedCSIElement(value)],
});

const newQuantityCell = (value: number): Cell<'Quantity'> => ({
    type: DatumElementType.Cell,
    subType: 'Quantity',
    children: [newDecimalText(value)],
});

const newUnitOfMeasureCell = (value: UOM): Cell<'UnitOfMeasure'> => ({
    type: DatumElementType.Cell,
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
        default:
            return Sheet.genAlphabeticHeader(col);
    }
};

export const newSheet = (): Sheet<3, 6> => ({
    type: DatumElementType.Sheet,
    cols: 3,
    rows: 6,
    genColHeader: genColHeader,
    children: [
        newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.Div09),
        newQuantityCell(84), newUnitOfMeasureCell(UOM.ManHour), newCSICell(CSI.Div09),
        newQuantityCell(8), newUnitOfMeasureCell(UOM.Gallons), newCSICell(CSI.Div09),
        newQuantityCell(2404.8), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.WoodAndPlastics),
        newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.ThermalAndMoisture),
        newQuantityCell(12), newUnitOfMeasureCell(UOM.Each), newCSICell(CSI.DoorsAndWindows),
    ],
});
