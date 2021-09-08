import { ElementType, TypedElement } from 'datum';
import { Text } from 'slate';

export interface TestCell extends TypedElement<ElementType.Cell, Text[]> {
    isCool: string;
}

declare module 'datum' {
    interface CustomTypes {
        Cell: TestCell;
    }
}
