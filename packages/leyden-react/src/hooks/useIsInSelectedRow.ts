import { Descendant } from 'slate';

import { useCoordinates } from './useCoordinates';
import { useIsRowSelected } from './useIsRowSelected';

export const useIsInSelectedRow = (node: Descendant): boolean => {
    const coords = useCoordinates(node);
    return useIsRowSelected(coords?.y??-1);
};
