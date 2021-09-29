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
            Name: {
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
                validator: 'onlyTwos';
            },
            Text: {
                text: string;
            },
            WholeDollars: {
                text: string;
                validator: 'integer';
            };
        };
        Validator: 'onlyTwos';
    }
}
