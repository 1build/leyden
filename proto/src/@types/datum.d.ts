declare module 'datum' {
    import { Descendant } from 'slate';

    export type ElementType =
        | 'cell'
        | 'row'
        | 'table';

    export interface DatumElement<T extends ElementType, C extends Descendant[]> {
        type: T;
        children: C;
    }

    export type SlateDatumElement = DatumElement<ElementType, Descendant[]>;
}
