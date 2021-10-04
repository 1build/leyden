import { Transforms as SlateTransforms } from 'slate';

import { CellTransforms } from './Cell';
import { SelectionTransforms } from './Selection';
import { TableTransforms } from './Table';

export type Transforms =
    & CellTransforms
    & SelectionTransforms
    & TableTransforms
    & typeof SlateTransforms;

export const Transforms: Transforms = {
    ...CellTransforms,
    ...SelectionTransforms,
    ...TableTransforms,
    ...SlateTransforms,
};
