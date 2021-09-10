import { Element, Text } from 'leyden';

import { CSI, UOM } from '../types';

declare module 'leyden' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [Element<'ColorCodedCSI'>];
            };
            Quantity: {
                children: [Text<'Decimal'>];
            };
            Total: {
                children: [Text<'WholeDollars'>]
            };
            UnitOfMeasure: {
                children: [Text<'UOM'>];
            };
        };
        Elements: {
            ColorCodedCSI: {
                children: [Text<'CSI'>];
            };
        },
        Text: {
            CSI: {
                text: CSI;
                validator: 'csi';
            };
            Decimal: {
                text: string;
                validator: 'numeric';
            },
            UOM: {
                text: UOM;
                validator: 'uom';
            };
            WholeDollars: {
                text: string;
                validator: 'integer';
            };
        };
        Validator: 'csi'|'uom';
    }
}
