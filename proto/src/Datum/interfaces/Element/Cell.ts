import { Descendant, Element } from 'slate';
import { DatumElement } from 'datum';

export enum CellType {
    ColumnHeader,
    Origin,
    RowHeader,
    Standard,
}

export interface Cell<T extends CellType=CellType.Standard> extends DatumElement<'cell', Descendant[]> {
    cellType: CellType;
}

export interface CellInterface {
    isCell: (value: any) => value is Cell;
}

const isCell = (value: any): value is Cell => (
    Element.isElement(value) && value.type === 'cell'
)

export const Cell: CellInterface = {

    /**
     * Check if a value implements the `Cell` interface.
     */

    isCell,
}
