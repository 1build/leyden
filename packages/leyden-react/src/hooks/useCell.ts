import {
    Cell,
    CellType,
    Coordinates,
    Table,
    LeydenEditor,
} from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export type UseCell = <T extends CellType=CellType>(
    coords: Coordinates,
    options?: {
        type?: T,
    }
) => Cell<T>;

export const useCell: UseCell = <T extends CellType=CellType>(
    coords: Coordinates,
    options: {
        type?: T,
    } = {}
) => {
    const { type } = options;
    const editor = useLeydenStatic();

    const [cell, setCell] = useState<Cell<T>>(
        Table.cell(LeydenEditor.table(editor), { at: coords, type })
    );

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToCell<T>(
            editor,
            setCell,
            { at: coords, type }
        );
        return () => {
            unsubscribe();
        };
    }, [coords, type]);

    return cell;
};
