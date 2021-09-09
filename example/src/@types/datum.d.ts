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
                data: {
                    value: CSI;
                }
            };
            Decimal: {
                text: '';
                data: {
                    value: number;
                }
            },
            UOM: {
                text: '';
                data: {
                    value: UOM;
                }
            },
        }
    }
}
