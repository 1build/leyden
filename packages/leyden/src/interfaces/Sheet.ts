import { Element, Path } from 'slate';

import { Cell, CellType } from './Cell';
import { Coordinates } from './Coordinates';
import {
    LeydenElementType,
    Multiply,
    TupleOf,
    TypedElement,
} from '../types';

export interface Sheet<
    Cols extends number,
    Rows extends number,
> extends TypedElement<LeydenElementType.Sheet, TupleOf<Cell<CellType>, Multiply<Cols, Rows>>> {
    cols: Cols;
    rows: Rows;
    genColHeader?: (pos: number) => string;
    genRowHeader?: (pos: number) => string;
}

export const Sheet = {
    /**
     * cellsFitSheet is a typeguard to check if an array of cells conforms to sheet dimensions.
     */

    cellsFitSheet: <Cols extends number, Rows extends number, T extends CellType>(
        cells: Cell<T>[],
        count: Multiply<Cols, Rows>,
    ): cells is TupleOf<Cell<T>, Multiply<Cols, Rows>> => (
        cells.length === count
    ),

    /**
     * coordPath returns a path to a cell located at the provided coordinates.
     */

    coordPath: <Cols extends number, Rows extends number>(
        sheet: Sheet<Cols, Rows>,
        coords: Coordinates,
    ): Path => ([
        0, (coords.y*sheet.cols)+coords.x
    ]),

    /**
     * Generate an alphabetic column/row header from its 0-indexed position.
     */

    genAlphabeticHeader: (pos: number): string => {
        const positionBase26 = pos.toString(26);
        let label = '';
        for (let i = 0; i < positionBase26.length; i++) {
            const originalCharCode = positionBase26.charCodeAt(i);
            let adjustedCharCode: number;
            if (originalCharCode <= 57) {
                adjustedCharCode = originalCharCode + 17;
            } else {
                adjustedCharCode = originalCharCode - 22;
            }
            if (i < positionBase26.length-1) {
                adjustedCharCode -= 1;
            }
            label = `${label}${String.fromCharCode(adjustedCharCode)}`;
        }
        return label;
    },

    /**
     * Generate a numeric column/row header from its 0-indexed position.
     */

    genNumericHeader: (pos: number): string => (
        (pos+1).toString(10)
    ),

    /**
     * Get the total number of cells within a sheet as a number literal type.
     */

    getCellCount: <Cols extends number, Rows extends number>(
        sheet: Sheet<Cols, Rows>
    ): Multiply<Cols, Rows> => (
        sheet.cols*sheet.rows as Multiply<Cols, Rows>
    ),

    /**
     * Get the coordinates of the cell at the nth position of the flat cell list.
     */

    getNthCellCoords: <Cols extends number, Rows extends number>(
        sheet: Sheet<Cols, Rows>,
        n: number
    ): Coordinates => ({
        x: n % sheet.cols,
        y: Math.floor(n/sheet.cols),
    }),

    /**
     * Return true if a coordinate pair lies within the provided sheet.
     */

    hasCoords: <Cols extends number, Rows extends number>(
        sheet: Sheet<Cols, Rows>,
        coords: Coordinates
    ): boolean => (
        coords.x<sheet.cols && coords.y<sheet.rows
    ),

    /**
     * Check if an element is a `Sheet`.
     */

    isSheet: (el: Element): el is Sheet<number, number> => (
        el.type === LeydenElementType.Sheet
    ),

    /**
     * Check if an element is a `Sheet` with specific dimensions.
     */

    isDimensionalSheet: <Cols extends number, Rows extends number>(
        el: Element,
    ): el is Sheet<Cols, Rows> => (
        Sheet.isSheet(el) && Sheet.cellsFitSheet(el.children, Sheet.getCellCount(el))
    )
};