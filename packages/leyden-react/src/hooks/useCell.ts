import {
    Cell,
    CellType,
    Coordinates,
    LeydenEditor,
} from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export type UseCell = <T extends CellType>(
    type: T,
    coords: Coordinates
) => Cell<T>|null;

export const useCell: UseCell = <T extends CellType>(
    type: T,
    coords: Coordinates
) => {
    const editor = useLeydenStatic();

    const [cell, setCell] = useState<Cell<T>|null>(null);

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToCell<T>(
            editor,
            coords,
            type,
            setCell,
        );
        return () => {
            unsubscribe();
        }
    }, [coords, type]);

    return cell;
};