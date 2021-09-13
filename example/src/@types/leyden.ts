import { Text } from 'leyden';

import { CSI, UOM } from '../types';

declare module 'leyden' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [Text<'CSI'>];
            };
            Quantity: {
                children: [Text<'Decimal'>];
            };
            Text: {
                children: [Text<'Text'>];
            };
            UnitOfMeasure: {
                children: [Text<'UOM'>];
            };
            WholeDollars: {
                children: [Text<'WholeDollars'>]
            };
        };
        Text: {
            CSI: {
                text: '';
                validator: 'empty';
                data: {
                    csi: CSI;
                }
            };
            Decimal: {
                text: string;
                validator: 'numeric';
            },
            Text: {
                text: string;
            },
            UOM: {
                text: '';
                validator: 'empty';
                data: {
                    uom: UOM;
                }
            };
            WholeDollars: {
                text: string;
                validator: 'integer';
            };
        };
    }
}
