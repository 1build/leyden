import {
    Cell,
    CellType,
    Coordinates,
} from 'leyden';
import { useMemo } from 'react';

import { useLeydenStatic } from './useLeydenStatic';
import { ReactEditor } from '../plugin/ReactEditor';

export const useCellCoordinates = (cell: Cell<CellType>): Coordinates|null => {
    const editor = useLeydenStatic();

    const coordinates = useMemo(() => (
        ReactEditor.cellCoords(editor, cell)
    ), []);

    return coordinates;
};
