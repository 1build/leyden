import { Cell, Table, Text } from 'leyden';

import { CSI, UOM } from '../types';

const newEmptyText = (): Text<'Empty'> => ({
    validator: 'empty',
    type: 'Empty',
    text: '',
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

const wholeDollarsFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
});
const newWholeDollarsText = (value: number): Text<'WholeDollars'> => ({
    type: 'WholeDollars',
    validator: 'integer',
    text: wholeDollarsFormatter.format(value),
});

const newCSICell = (csi: CSI): Cell<'CSI'> => ({
    type: 'cell',
    cellType: 'CSI',
    children: [newEmptyText()],
    isEditable: false,
    csi,
});

const newQuantityCell = (value: number): Cell<'Quantity'> => ({
    type: 'cell',
    cellType: 'Quantity',
    children: [newDecimalText(value)],
});

const newTextCell = (value: string): Cell<'Text'> => ({
    type: 'cell',
    cellType: 'Text',
    children: [newTextText(value)],
});

const newWholeDollarsCell = (value: number): Cell<'WholeDollars'> => ({
    type: 'cell',
    cellType: 'WholeDollars',
    children: [newWholeDollarsText(value)],
});

const newUnitOfMeasureCell = (uom: UOM): Cell<'UnitOfMeasure'> => ({
    type: 'cell',
    cellType: 'UnitOfMeasure',
    children: [newEmptyText()],
    isEditable: false,
    uom,
});

export const genColHeader = (col: number): string => {
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
            return Table.genAlphabeticHeader(col);
    }
};

/* eslint-disable max-len */
export const newTable = (): Table => ({
    type: 'table',
    cols: 5,
    rows: 6,
    genColHeader,
    children: [
        newTextCell('Drywall 5 X 8 sheet'), newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.Div09), newWholeDollarsCell(15730),
        newTextCell('Drywall installer'), newQuantityCell(84), newUnitOfMeasureCell(UOM.ManHour), newCSICell(CSI.Div09), newWholeDollarsCell(7832),
        newTextCell('50 gallon Sherwin Williams paint'), newQuantityCell(8), newUnitOfMeasureCell(UOM.Gallons), newCSICell(CSI.Div09), newWholeDollarsCell(25),
        newTextCell('Hardwood Flooring'), newQuantityCell(2404.8), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.WoodAndPlastics), newWholeDollarsCell(2321987),
        newTextCell('R9 Sound insulation'), newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.ThermalAndMoisture), newWholeDollarsCell(651876),
        newTextCell('Pella 39 X 59 in Casement window'), newQuantityCell(12), newUnitOfMeasureCell(UOM.Each), newCSICell(CSI.DoorsAndWindows), newWholeDollarsCell(530),
    ],
});
/* eslint-enable max-len */
