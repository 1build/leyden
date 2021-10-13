import { Coordinates, LeydenEditor } from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export const useSelectedCoordinates = (): Coordinates|null => {
    const editor = useLeydenStatic();

    const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates|null>(
        LeydenEditor.selectedCoords(editor)
    );

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToSelectedCoordinates(
            editor,
            setSelectedCoordinates
        );
        return () => {
            unsubscribe();
        };
    }, []);

    return selectedCoordinates;
};
