import { Transforms as SlateTransforms } from 'slate';

import { CellTransforms } from './Cell';
import { SelectionTransforms } from './Selection';

export type Transforms =
    & CellTransforms
    & SelectionTransforms
    & typeof SlateTransforms;

export const Transforms: Transforms = {
    ...CellTransforms,
    ...SelectionTransforms,
    ...SlateTransforms,
};
