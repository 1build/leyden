import { Element } from 'datum';
import { Text } from 'slate';

declare module 'datum' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [Element<'ColorBox'>];
            };
            Quantity: {
                children: [Element<'OutlineBox'>];
            };
            UnitOfMeasure: {
                children: [Text];
            };
        };
        Elements: {
            OutlineBox: {
                children: Text[];
            };
            ColorBox: {
                children: Text[];
                data: {
                    color: string;
                };
            };
        },
    }
}
