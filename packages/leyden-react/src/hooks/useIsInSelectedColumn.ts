import { Descendant } from 'slate';

import { useCoordinates } from './useCoordinates';
import { useIsColumnSelected } from './useIsColumnSelected';

export const useIsInSelectedColumn = (node: Descendant): boolean => {
    const coords = useCoordinates(node);
    return useIsColumnSelected(coords?.x??-1);
};
