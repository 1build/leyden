import { Text } from 'leyden';

import { CSI, UOM } from '../types';

declare module 'leyden' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [Text<'Empty'>];
                isEditable: false;
                data: {
                    csi: CSI;
                }
            };
            Quantity: {
                children: [Text<'Decimal'>];
            };
            Text: {
                children: [Text<'Text'>];
            };
            UnitOfMeasure: {
                children: [Text<'Empty'>];
                isEditable: false;
                data: {
                    uom: UOM;
                }
            };
            WholeDollars: {
                children: [Text<'WholeDollars'>]
            };
        };
        Text: {
            Empty: {
                text: '';
                validator: 'empty';
            }
            Decimal: {
                text: string;
                validator: 'numeric';
            },
            Text: {
                text: string;
            },
            WholeDollars: {
                text: string;
                validator: 'integer';
            };
        };
    }
}
