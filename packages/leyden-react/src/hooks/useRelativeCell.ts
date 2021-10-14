import {
    Cell,
    CellType,
    Coordinates,
    CoordinateTranslation,
    Table,
    LeydenEditor,
} from 'leyden';
import { useEffect, useMemo, useState } from 'react';
import { Descendant } from 'slate';

import { useCoordinates } from './useCoordinates';
import { useLeydenStatic } from './useLeydenStatic';

export type UseRelativeCell = <T extends CellType=CellType>(
    node: Descendant,
    options?: {
        type?: T,
        translation?: CoordinateTranslation
    }
) => Cell<T>|null;

export const useRelativeCell: UseRelativeCell = <T extends CellType>(
    node: Descendant,
    options: {
        type?: T,
        translation?: CoordinateTranslation
    } = {}
) => {
    const { type, translation = {} } = options;
    const baseCoords = useCoordinates(node);
    const editor = useLeydenStatic();

    const relativeCoords = useMemo(() => {
        if (baseCoords === null) {
            return null;
        }
        return Coordinates.translate(baseCoords, translation);
    }, [baseCoords, translation]);

    const [cell, setCell] = useState(() => {
        if (relativeCoords === null) {
            return null;
        }
        return Table.cell(LeydenEditor.table(editor), { at: relativeCoords, type });
    });

    useEffect(() => {
        if (relativeCoords === null) {
            setCell(null);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {};
        }
        const unsubscribe = LeydenEditor.subscribeToCell<T>(
            editor,
            setCell,
            { at: relativeCoords, type }
        );
        return () => {
            unsubscribe();
        };
    }, [relativeCoords, type]);

    return cell;
};
