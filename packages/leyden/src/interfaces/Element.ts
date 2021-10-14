import { Element as SlateElement } from 'slate';

import { Cell, CellType } from './Cell';
import {
    ExtendableTypeIsExtended,
    ExtendedElementsType,
    ExtendedType,
} from './CustomTypes';
import { Table } from './Table';
import { Distribute, Keys } from '../utils/types';

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

export type ElementIsExtended = ExtendableTypeIsExtended<'Elements'>;
export type Elements = ExternalElements&InternalElement;
export type ElementType = Distribute<ExternalElementType|InternalElementType>;

export type Element<T extends ElementType> = ExtendedElementsType<T, Elements>;

export type LeydenElement =
    | Cell<CellType>
    | ExternalElement<ExternalElementType>
    | Table;

export interface ElementInterface {
    isElement: <T extends ElementType=ElementType>(
        value: any, //eslint-disable-line @typescript-eslint/no-explicit-any
        options?: {
            type?: T
        }
    ) => value is Element<T>;
    isVoid: (el: LeydenElement) => boolean;
}

export const Element: ElementInterface = {
    /**
     * Check if a value is an Element.
     */

    isElement<T extends ElementType=ElementType>(
        value: any, //eslint-disable-line @typescript-eslint/no-explicit-any
        options: {
            type?: T
        } = {}
    ): value is Element<T> {
        const { type } = options;
        if (type === undefined) {
            return SlateElement.isElement(value);
        }
        return Element.isElement(value) && value.type === type;
    },

    /**
     * Return `true` if an element is void (not editable).
     */

    isVoid(el: LeydenElement): boolean {
        return el.isEditable === false;
    },
};
