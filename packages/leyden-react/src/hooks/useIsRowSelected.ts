import { LeydenEditor } from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export const useIsRowSelected = (row: number): boolean => {
    const editor = useLeydenStatic();

    const [isRowSelected, setIsRowSelected] = useState(() => {
        const newSelection = LeydenEditor.selectedCoords(editor);
        return newSelection?.y === row;
    });

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToSelectedCoordinates(editor, sel => {
            setIsRowSelected(sel?.y === row);
        });
        return () => {
            unsubscribe();
        };
    }, [row]);

    return isRowSelected;
};
