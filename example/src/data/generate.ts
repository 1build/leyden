import {
    Cell,
    CellType,
    Element,
    Table,
    Text,
} from 'leyden';

import { CSI, UOM } from '../types';

const newEmptyText = () => Text.new(
    'Empty',
    '',
    { validator: 'empty' }
);

const newDecimalText = (value: number) => Text.new(
    'Decimal',
    value.toString(),
    { validator: 'onlyTwos' }
);

const newTextText = (text: string) => Text.new('Text', text, {});

const wholeDollarsFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
});
const newWholeDollarsText = (value: number) => Text.new(
    'WholeDollars',
    wholeDollarsFormatter.format(value),
    { validator: 'integer' },
);

const newNameElement = (value: string) => Element.new('Name', [newTextText(value)], {});

const newCSICell = (csi: CSI) => Cell.new('CSI', [newEmptyText()], {
    isVoid: true,
    csi,
});

const newNameCell = (value: string) => Cell.new('Name', [newNameElement(value)], {});

const newQuantityCell = (value: number) => Cell.new('Quantity', [newDecimalText(value)], {});

const newWholeDollarsCell = (value: number) => Cell.new('WholeDollars', [newWholeDollarsText(value)], {});

const newUnitOfMeasureCell = (uom: UOM) => Cell.new('UnitOfMeasure', [newEmptyText()], {
    isVoid: true,
    uom,
});

export const newRow = (
    name: string,
    quantity: number,
    uom: UOM,
    csi: CSI,
    total: number,
): Cell<CellType>[] => {
    return [
        newNameCell(name),
        newQuantityCell(quantity),
        newUnitOfMeasureCell(uom),
        newCSICell(csi),
        newWholeDollarsCell(total),
    ];
};

export const newTable = (): Table => (
    Table.new(5, [
        ...newRow('Drywall 5 X 8 sheet', 2222, UOM.SF, CSI.Div09, 15730),
        ...newRow('Drywall installer', 22, UOM.ManHour, CSI.Div09, 7832),
        ...newRow('50 gallon Sherwin Williams paint', 2, UOM.Gallons, CSI.Div09, 25),
        ...newRow('Hardwood Flooring', 222222, UOM.SF, CSI.WoodAndPlastics, 2321987),
        ...newRow('R9 Sound insulation', 2, UOM.SF, CSI.ThermalAndMoisture, 651876),
        ...newRow('Pella 39 X 59 in Casement window', 222, UOM.Each, CSI.DoorsAndWindows, 530),
    ])
);
