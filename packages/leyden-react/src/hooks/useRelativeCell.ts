import {
    Cell,
    CellType,
    Coordinates,
    CoordinateTranslation,
    LeydenEditor,
} from 'leyden';
import { useEffect, useMemo, useState } from 'react';

import { useCell } from './useCell';
import { useLeydenStatic } from './useLeydenStatic';
import { ReactEditor } from '../plugin/ReactEditor';

export type UseRelativeCell = <T extends CellType>(
    type: T,
    base: Cell<CellType>,
    translation: CoordinateTranslation
) => Cell<T>|null;

export const useRelativeCell: UseRelativeCell = <T extends CellType>(
    type: T,
    base: Cell<CellType>,
    translation: CoordinateTranslation,
) => {
    const [cell, setCell] = useState<Cell<T>|null>(null);

    const editor = useLeydenStatic();

    const baseCoords = useMemo(() => (
        ReactEditor.cellCoords(editor, base)
    ), [])

    const relativeCoords = useMemo(() => {
        if (baseCoords === null) {
            return null;
        }
        return Coordinates.translate(baseCoords, translation);
    }, [baseCoords, translation]);

    useEffect(() => {
        if (relativeCoords === null) {
            setCell(null);
            return () => {};
        }
        const unsubscribe = LeydenEditor.subscribeToCell<T>(
            editor,
            relativeCoords,
            type,
            setCell,
        );
        return () => {
            unsubscribe();
        }
    }, [relativeCoords, type]);

    return cell;
};