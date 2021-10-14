import { Element, Text } from 'leyden';

import { CSI, UOM } from '../types';

declare module 'leyden' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [Text<'Empty'>];
                isVoid: true;
                data: {
                    csi: CSI;
                }
            };
            Quantity: {
                children: [Text<'Decimal'>];
            };
            Name: {
                children: [Element<'Name'>];
            };
            UnitOfMeasure: {
                children: [Text<'Empty'>];
                isVoid: true;
                data: {
                    uom: UOM;
                }
            };
            WholeDollars: {
                children: [Text<'WholeDollars'>]
            };
        };
        Elements: {
            Name: {
                children: [Text<'Text'>];
            }
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
