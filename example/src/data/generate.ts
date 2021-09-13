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

const newNameCell = (value: string): Cell<'Name'> => ({
    type: 'cell',
    cellType: 'Name',
    children: [newTextText(value)],
});

const newQuantityCell = (value: number): Cell<'Quantity'> => ({
    type: 'cell',
    cellType: 'Quantity',
    children: [newDecimalText(value)],
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

/* eslint-disable max-len */
export const newTable = (): Table => ({
    type: 'table',
    cols: 5,
    rows: 6,
    children: [
        newNameCell('Drywall 5 X 8 sheet'), newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.Div09), newWholeDollarsCell(15730),
        newNameCell('Drywall installer'), newQuantityCell(84), newUnitOfMeasureCell(UOM.ManHour), newCSICell(CSI.Div09), newWholeDollarsCell(7832),
        newNameCell('50 gallon Sherwin Williams paint'), newQuantityCell(8), newUnitOfMeasureCell(UOM.Gallons), newCSICell(CSI.Div09), newWholeDollarsCell(25),
        newNameCell('Hardwood Flooring'), newQuantityCell(2404.8), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.WoodAndPlastics), newWholeDollarsCell(2321987),
        newNameCell('R9 Sound insulation'), newQuantityCell(1805.56), newUnitOfMeasureCell(UOM.SF), newCSICell(CSI.ThermalAndMoisture), newWholeDollarsCell(651876),
        newNameCell('Pella 39 X 59 in Casement window'), newQuantityCell(12), newUnitOfMeasureCell(UOM.Each), newCSICell(CSI.DoorsAndWindows), newWholeDollarsCell(530),
    ],
});
/* eslint-enable max-len */
