import {
    Cell,
    CellType,
    Coordinates,
    Table,
    LeydenEditor,
} from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export type UseCell = <T extends CellType>(
    type: T,
    coords: Coordinates|null
) => Cell<T>|null;

export const useCell: UseCell = <T extends CellType>(
    type: T,
    coords: Coordinates|null
) => {
    const editor = useLeydenStatic();

    const [cell, setCell] = useState(coords === null ? null :
        Table.cellOfType<T>(LeydenEditor.table(editor), type, { at: coords })
    );

    useEffect(() => {
        if (coords === null) {
            setCell(null);
            return;
        }
        const unsubscribe = LeydenEditor.subscribeToCell<T>(
            editor,
            type,
            setCell,
            { at: coords }
        );
        return () => {
            unsubscribe();
        };
    }, [coords, type]);

    return cell;
};
