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
    isElement: (
        value: any //eslint-disable-line @typescript-eslint/no-explicit-any
    ) => value is Element<ElementType>;
    isElementOfType: <T extends ElementType>(
        element: Element<ElementType>,
        type: T
    ) => element is Element<T>;
    isVoid: (el: LeydenElement) => boolean;
}

export const Element: ElementInterface = {
    /**
     * Check if a value is an Element.
     */

    isElement(
        value: any //eslint-disable-line @typescript-eslint/no-explicit-any
    ): value is Element<ElementType> {
        return SlateElement.isElement(value);
    },

    /**
     * Check if an element is of a specific element type.
     */

    isElementOfType<T extends ElementType>(
        element: Element<ElementType>,
        type: T
    ): element is Element<T> {
        return element.type === type;
    },

    /**
     * Return `true` if an element is void (not editable).
     */

    isVoid(el: LeydenElement): boolean {
        return el.isEditable === false;
    },
};
