import { Coordinates } from 'leyden';
import { useMemo } from 'react';
import { Descendant } from 'slate';

import { useCoordinates } from './useCoordinates';
import { useSelectedCoordinates } from './useSelectedCoordinates';

export const useCellIsSelected = (node: Descendant): boolean => {
    const ownCoords = useCoordinates(node);
    const selectedCoords = useSelectedCoordinates();

    const cellSelected = useMemo(() => {
        return (
            ownCoords !== null
            && selectedCoords !== null
            && Coordinates.equals(ownCoords, selectedCoords)
        );
    }, [ownCoords, selectedCoords]);

    return cellSelected;
};
