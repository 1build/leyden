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
    const [refreshTimeoutID, setRefreshTimeoutID] = useState<ReturnType<typeof setTimeout>|null>(null);

    const [coordinates, setCoordinates] = useState(ReactEditor.cellCoords(editor, cell));

    useEffect(() => {
        if (coordinates === null) {
            return;
        }
        const unsubscribe = LeydenEditor.subscribeToOperations(editor, op => {
            if (refreshTimeoutID !== null) {
                return;
            }
            if (!LeydenEditor.operationMovesCoords(editor, op, coordinates)) {
                return;
            }
            // If not wrapped in `setTimeout`, this runs before the cell paths are updated
            // and coordinate movement is never detected.
            // To prevent rapid re-calculation of coordinates when events like row deletion occur, a
            // throttler limits refresh frequency to 4 per second.
            setRefreshTimeoutID(setTimeout(() => {
                setRefreshTimeoutID(null);
                const newCoords = ReactEditor.cellCoords(editor, cell);
                if (newCoords === null || !Coordinates.equals(coordinates, newCoords)) {
                    setCoordinates(newCoords);
                }
            }, 250));
        });
        return () => {
            unsubscribe();
        };
    }, [coordinates]);

    return coordinates;
};
