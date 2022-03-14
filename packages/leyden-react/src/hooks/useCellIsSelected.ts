import { Descendant } from 'slate';

import { useCoordinates } from './useCoordinates';
import { useAreCoordinatesSelected } from './useAreCoordinatesSelected';

export const useCellIsSelected = (node: Descendant): boolean => {
    const ownCoords = useCoordinates(node);

    return useAreCoordinatesSelected(ownCoords);
};
