import { LeydenEditor } from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export const useIsColumnSelected = (column: number): boolean => {
    const editor = useLeydenStatic();

    const [isColumnSelected, setIsColumnSelected] = useState(() => {
        const newSelection = LeydenEditor.selectedCoords(editor);
        return newSelection?.x === column;
    });

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToSelectedCoordinates(editor, sel => {
            setIsColumnSelected(sel?.x === column);
        });
        return () => {
            unsubscribe();
        };
    }, [column]);

    return isColumnSelected;
};
