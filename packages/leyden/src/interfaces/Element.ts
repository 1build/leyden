import { Element as SlateElement } from 'slate';

import { Cell, CellType } from './Cell';
import {
    ExtendableTypeIsExtended,
    ExtendedElementsArgsType,
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
    new: <T extends ElementType>(
        type: T,
        children: Element<T>['children'],
        args: ExtendedElementsArgsType<T, Elements>,
    ) => Element<T>;
    isElement: <T extends ElementType=ElementType>(
        value: unknown,
        options?: {
            type?: T
        }
    ) => value is Element<T>;
    isInline: (el: LeydenElement) => boolean;
    isVoid: (el: LeydenElement) => boolean;
}

export const Element: ElementInterface = {
    /**
     * Create a new Element.
     */

    new<T extends ElementType>(
        type: T,
        children: Element<T>['children'],
        args: ExtendedElementsArgsType<T, Elements>,
    ): Element<T> {
        return {
            type,
            ...args,
            children,
        };
    },

    /**
     * Check if a value is an Element.
     */

    isElement<T extends ElementType=ElementType>(
        value: unknown,
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
     * Return `true` if an element is inline.
     */

    isInline(el: LeydenElement): boolean {
        return el.isInline === true;
    },

    /**
     * Return `true` if an element is void.
     */

    isVoid(el: LeydenElement): boolean {
        return el.isVoid === true;
    },
};
