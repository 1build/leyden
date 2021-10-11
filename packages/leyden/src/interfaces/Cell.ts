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
        args: ExtendedCellArgsType<T, Cells>,
    ) => Cell<T>;
    newDefault: (num: number) => Cell<typeof extendableComponentDefaultKey>;
    isCell: (el: Element) => el is Cell<CellType>;
    isCellList: (els: Element[]) => els is Cell<CellType>[];
    isCellType: <T extends CellType>(cell: Cell<CellType>, type: T) => cell is Cell<T>;
}
// ExtractDataProp<DefaultExtendedComponentTypeEntries<"Cells">[T]>
export const Cell: CellInterface = {
    /**
     * Create a new Cell.
     */

    new<T extends CellType>(
        type: T,
        args: ExtendedCellArgsType<T, Cells>,
    ): Cell<T> {
        return {
            type: 'cell',
            cellType: type,
            ...args,
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
            isEditable: true,
        };
    },

    /**
     * Check if an element is a `Cell`.
     */

    isCell(el: Element): el is Cell<CellType> {
        return el.type === 'cell';
    },

    /**
     * Check if a list of elements are all of type `Cell`.
     */

    isCellList(value: Element[]): value is Cell<CellType>[] {
        return Array.isArray(value) && value.every(val => Cell.isCell(val));
    },

    /**
     * Check if a cell is a specific cell type.
     */

    isCellType<T extends CellType>(
        cell: Cell<CellType>,
        type: T
    ): cell is Cell<T> {
        return cell.cellType === type;
    },
};
