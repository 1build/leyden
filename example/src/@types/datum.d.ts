import { Element, Text } from 'datum';

import { CSI, UOM } from '../types';

declare module 'datum' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [Element<'ColorCodedCSI'>];
            };
            Quantity: {
                children: [Text<'Decimal'>];
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
                text: '';
                validator: 'csi';
                data: {
                    value: CSI;
                };
            };
            Decimal: {
                text: string;
                validator: 'numeric';
                data: {
                    value: number;
                };
            },
            UOM: {
                text: '';
                validator: 'uom';
                data: {
                    value: UOM;
                };
            };
        };
        Validator: 'csi'|'uom';
    }
}
