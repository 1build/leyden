import { Element } from 'slate';

import {
    extendableComponentDefaultKey,
    ExtendableTypeIsExtended,
    ExtendedCellArgsType,
    ExtendedCellType,
    ExtendedType,
} from './CustomTypes';
import { Text } from './Text';
import { Keys } from '../utils/types';

export type CellIsExtended = ExtendableTypeIsExtended<'Cells'>;
export type Cells = ExtendedType<'Cells'>;
export type CellType = Keys<Cells>;

export type Cell<T extends CellType> = ExtendedCellType<T, Cells>;

export interface CellInterface {
    new: <T extends CellType>(
        type: T,
        children: Cell<T>['children'],
        args: ExtendedCellArgsType<T, Cells>,
    ) => Cell<T>;
    newDefault: (num: number) => Cell<typeof extendableComponentDefaultKey>;
    isCell: <T extends CellType=CellType>(
        element: Element,
        options?: {
            type?: T
        }
    ) => element is Cell<T>;
    isCellLenient: <T extends CellType=CellType>(
        value: unknown,
        options?: {
            type?: T
        }
    ) => value is Cell<T>;
    isCellList: <T extends CellType=CellType>(
        elements: Element[],
        options?: {
            type?: T
        }
    ) => elements is Cell<CellType>[];
    isCellListLenient: <T extends CellType=CellType>(
        value: unknown,
        options?: {
            type?: T
        }
    ) => value is Cell<CellType>[];
}

export const Cell: CellInterface = {
    /**
     * Create a new Cell.
     */

    new<T extends CellType>(
        type: T,
        children: Cell<T>['children'],
        args: ExtendedCellArgsType<T, Cells>,
    ): Cell<T> {
        return {
            ...args,
            type: 'cell',
            cellType: type,
            children,
        };
    },

    /**
     * Create a new cell using the default Cell type.
     */

    newDefault(num: number): Cell<typeof extendableComponentDefaultKey> {
        return {
            type: 'cell',
            cellType: extendableComponentDefaultKey,
            children: [Text.newDefault(num)],
        };
    },

    /**
     * Check if an element is a `Cell`.
     */

    isCell<T extends CellType=CellType>(
        element: Element,
        options: {
            type?: T
        } = {}
    ): element is Cell<T> {
        const { type } = options;
        if (type === undefined) {
            return element.type === 'cell';
        }
        return Cell.isCell(element) && element.cellType === type;
    },

    /**
     * Check if an unknown value is a `Cell`.
     * This is a more broad and therefore less performant `isCell` variation.
     */

    isCellLenient<T extends CellType=CellType>(
        value: unknown,
        options?: {
            type?: T
        }
    ): value is Cell<T> {
        return Element.isElement(value) && Cell.isCell(value, options);
    },

    /**
     * Check if a list of elements are all of type `Cell`.
     */

    isCellList<T extends CellType=CellType>(
        elements: Element[],
        options?: {
            type?: T
        }
    ): elements is Cell<CellType>[] {
        return elements.every(element => Cell.isCell(element, options));
    },

    /**
     * Check if an unknown is a array of `Cell`-type values.
     */

    isCellListLenient<T extends CellType=CellType>(
        value: unknown,
        options?: {
            type?: T
        }
    ): value is Cell<CellType>[] {
        return Array.isArray(value) && value.every(val => Cell.isCellLenient(val, options));
    },
};
