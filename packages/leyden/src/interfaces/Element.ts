import { Cell, CellType } from './Cell';
import { ExtendedElementsType, ExtendedType } from './CustomTypes';
import { Table } from './Table';
import { Distribute, Keys } from '../types';

export type ExternalElements = ExtendedType<'Elements'>;
export type ExternalElementType = Keys<ExternalElements>;

export type ExternalElement<T extends ExternalElementType> = ExtendedElementsType<T, ExternalElements>;

export type InternalElement = {
    cell: Cell<CellType>;
    table: Table;
}
export type InternalElementType =
    | 'cell'
    | 'table';

export type Elements = ExternalElements&InternalElement;
export type ElementType = Distribute<ExternalElementType|InternalElementType>

export type Element<T extends ElementType> = ExtendedElementsType<T, Elements>;

export type LeydenElement =
    | Cell<CellType>
    | ExternalElement<ExternalElementType>
    | Table;

export const Element = {
    /**
     * Return `true` if an element is void (not editable).
     */

    isVoid: (el: LeydenElement): boolean => (
        el.isEditable === false
    ),
};
