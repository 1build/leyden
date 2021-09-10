import { Cell, CellType } from './Cell';
import { ExtendedElementsType, ExtendedType } from './CustomTypes';
import { Distribute, Keys } from '../types';

export type ExternalElements = ExtendedType<'Elements'>;
export type ExternalElementType = Keys<ExternalElements>;

type InternalElements = {
    cell: Cell<CellType>;
}
type InternalElementType =
    | 'cell';

export type Elements = ExternalElements&InternalElements;
export type ElementType = Distribute<ExternalElementType|InternalElementType>

export type Element<T extends ElementType> = ExtendedElementsType<T, Elements>;

export const Element = {
};
