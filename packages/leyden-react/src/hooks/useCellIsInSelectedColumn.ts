import { Cell, CellType } from 'leyden';

import { useCellCoordinates } from './useCellCoordinates';
import { useIsColumnSelected } from './useIsColumnSelected';

export const useCellIsInSelectedColumn = (cell: Cell<CellType>): boolean => {
    const coords = useCellCoordinates(cell);
    return useIsColumnSelected(coords?.x??-1);
};
