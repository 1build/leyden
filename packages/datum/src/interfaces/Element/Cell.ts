import { Descendant, Element } from 'slate';

import { DatumElement, ElementType } from './types';

export enum CellType {
    ColumnHeader,
    Content,
    Origin,
    RowHeader,
}

type CellDimension<T extends CellType> =
    T extends CellType.RowHeader
        ? { height: number|null }
        : T extends CellType.ColumnHeader
            ? { width: number|null }
            : {}; // eslint-disable-line @typescript-eslint/ban-types

export type Cell<T extends CellType=CellType> = CellDimension<T> & DatumElement<ElementType.Cell, Descendant[]> & {
    cellType: T;
};

const elementIsCell = (el: Element): el is Cell => (
    el.type === ElementType.Cell
);

export const Cell = {
    /**
     * Check if an element is a `Cell`.
     * If `type` is passed, only return true if the passed value is a cell of the specified type.
     */

    isCell: <T extends CellType>(
        el: Element,
        type?: T,
    ): el is Cell<T extends CellType ? T : CellType> => (
        elementIsCell(el) && (type === undefined || el.cellType === type)
    ),

    /**
     * Check if a cell is editable.
     */

    isEditable: (cell: Cell): boolean => (
        cell.cellType === CellType.Content
    ),
};
