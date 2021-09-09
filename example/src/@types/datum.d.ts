import 'datum';
import { Text } from 'slate';

declare module 'datum' {
    interface CustomTypes {
        Cells: {
            CSI: [Text],
            Quantity: [Text],
            UnitOfMeasure: [Text],
        };
    }
}
