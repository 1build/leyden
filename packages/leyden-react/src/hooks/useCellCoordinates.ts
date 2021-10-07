import {
    Cell,
    CellType,
    Coordinates,
    LeydenEditor,
} from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';
import { ReactEditor } from '../plugin/ReactEditor';

export const useCellCoordinates = (cell: Cell<CellType>): Coordinates|null => {
    const editor = useLeydenStatic();

    const [coordinates, setCoordinates] = useState(ReactEditor.cellCoords(editor, cell));

    useEffect(() => {
        if (coordinates === null) {
            return;
        }
        let canceled = false;
        const unsubscribe = LeydenEditor.subscribeToOperations(editor, op => {
            if (!LeydenEditor.operationMovesCoords(editor, op, coordinates)) {
                return;
            }
            // If not wrapped in `setTimeout`, this runs before the cell paths are updated
            // and coordinate movement is never detected. 
            setTimeout(() => {
                const newCoords = ReactEditor.cellCoords(editor, cell);
                if ((newCoords === null || !Coordinates.equals(coordinates, newCoords))
                    && !canceled
                ) {
                    setCoordinates(newCoords);
                }
            });
        });
        return () => {
            canceled = true;
            unsubscribe();
        };
    }, [coordinates]);

    return coordinates;
};
