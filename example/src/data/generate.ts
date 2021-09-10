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

const newTextText = (text: string): Text<'Text'> => ({
    type: 'Text',
    text,
});

const newUOMText = (text: UOM): Text<'UOM'> => ({
    type: 'UOM',
    validator: 'uom',
    text,
});

const wholeDollarsFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
});
const newWholeDollarsText = (value: number): Text<'WholeDollars'> => ({
    type: 'WholeDollars',
    validator: 'integer',
    text: wholeDollarsFormatter.format(value),
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

const newTextCell = (value: string): Cell<'Text'> => ({
    type: LeydenElementType.Cell,
    subType: 'Text',
    children: [newTextText(value)],
});

const newWholeDollarsCell = (value: number): Cell<'WholeDollars'> => ({
    type: LeydenElementType.Cell,
    subType: 'WholeDollars',
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
            return 'Name';
        case 1:
            return 'Quantity';
        case 2:
            return 'UOM';
        case 3:
            return 'CSI';
        case 4:
            return 'Total';
        default:
            return Sheet.genAlphabeticHeader(col);
    }
};

/* eslint-disable max-len */
export const newSheet = (): Sheet<5, 6> => ({
    type: LeydenElementType.Sheet,
    cols: 5,
    rows: 6,
    genColHeader: genColHeader,
    children: [
        newTextCell('Drywall 5 X 8 sheet'), newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.Div09), newWholeDollarsCell(15730),
        newTextCell('Drywall installer'), newQuantityCell(84), newUnitOfMeasureCell(UOM.ManHour), newCSICell(CSI.Div09), newWholeDollarsCell(7832),
        newTextCell('50 gallon Sherwin Williams paint'), newQuantityCell(8), newUnitOfMeasureCell(UOM.Gallons), newCSICell(CSI.Div09), newWholeDollarsCell(25),
        newTextCell('Hardwood Flooring'), newQuantityCell(2404.8), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.WoodAndPlastics), newWholeDollarsCell(2321987),
        newTextCell('R9 Sound insulation'), newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.ThermalAndMoisture), newWholeDollarsCell(651876),
        newTextCell('Pella 39 X 59 in Casement window'), newQuantityCell(12), newUnitOfMeasureCell(UOM.Each), newCSICell(CSI.DoorsAndWindows), newWholeDollarsCell(530),
    ],
});
