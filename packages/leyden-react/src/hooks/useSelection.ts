import { Coordinates, LeydenEditor } from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export const useSelection = (): Coordinates|null => {
    const editor = useLeydenStatic();

    const [selection, setSelection] = useState<Coordinates|null>(
        LeydenEditor.selectedCoords(editor)
    );

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToSelection(
            editor,
            setSelection
        );
        return () => {
            unsubscribe();
        };
    }, []);

    return selection;
};
