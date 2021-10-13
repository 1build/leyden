import { Cell, CellType } from 'leyden';
import { Descendant } from 'slate';

import { useCell } from './useCell';
import { useCoordinates } from './useCoordinates';

export type UseOwnCell = <T extends CellType>(
    type: T,
    node: Descendant,
) => Cell<T>|null;

export const useOwnCell: UseOwnCell = <T extends CellType>(
    type: T,
    node: Descendant,
) => {
    const coords = useCoordinates(node);
    const cell = useCell(type, coords);
    return cell;
};
