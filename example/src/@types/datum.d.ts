import { CustomElement } from 'datum';
import { Text } from 'slate';

declare module 'datum' {
    interface CustomTypes {
        Cells: {
            CSI: {
                children: [CustomElement<'ColorBox'>];
            };
            Quantity: {
                children: [CustomElement<'OutlineBox'>];
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
