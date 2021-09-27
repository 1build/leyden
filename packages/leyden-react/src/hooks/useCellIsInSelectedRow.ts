import { Cell, CellType } from 'leyden';

import { useCellCoordinates } from './useCellCoordinates';
import { useIsRowSelected } from './useIsRowSelected';

export const useCellIsInSelectedRow = (cell: Cell<CellType>): boolean => {
    const coords = useCellCoordinates(cell);
    return useIsRowSelected(coords?.y??-1);
};
