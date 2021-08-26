import { Descendant } from 'slate';

export enum ElementType {
    Cell,
    Row,
    Table,
}

export interface DatumElement<T extends ElementType, C extends Descendant[]> {
    type: T;
    children: C;
}
