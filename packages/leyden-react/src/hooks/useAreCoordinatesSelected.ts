import { Coordinates, LeydenEditor } from 'leyden';
import { useEffect, useState } from 'react';

import { useLeydenStatic } from './useLeydenStatic';

export const useAreCoordinatesSelected = (coords: Coordinates|null): boolean => {
    const editor = useLeydenStatic();
    const currentSelectedCoords = LeydenEditor.selectedCoords(editor);
    const [coordinatesSelected, setCoordinatesSelected] = useState(
        (coords && currentSelectedCoords) ?
            Coordinates.equals(currentSelectedCoords, coords) :
            false
    );

    useEffect(() => {
        const unsubscribe = LeydenEditor.subscribeToSelectedCoordinatesByCoordinates(
            editor,
            setCoordinatesSelected,
            {
                at: coords
            },
        );
        return () => {
            unsubscribe();
        };
    }, []);

    return coordinatesSelected;
};
