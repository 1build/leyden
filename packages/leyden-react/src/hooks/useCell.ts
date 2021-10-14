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
    coords: Coordinates|null,
    options?: {
        type?: T,
    }
) => Cell<T>|null;

export const useCell: UseCell = <T extends CellType=CellType>(
    coords: Coordinates|null,
    options: {
        type?: T,
    } = {}
) => {
    const { type } = options;
    const editor = useLeydenStatic();

    const [cell, setCell] = useState(coords === null ? null :
        Table.cell(LeydenEditor.table(editor), { at: coords, type })
    );

    useEffect(() => {
        if (coords === null) {
            setCell(null);
            return;
        }
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
