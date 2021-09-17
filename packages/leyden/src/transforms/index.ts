import { CellTransforms } from './Cell';
import { SelectionTransforms } from './Selection';

export type Transforms =
    & CellTransforms
    & SelectionTransforms;

export const Transforms: Transforms = {
    ...CellTransforms,
    ...SelectionTransforms
};
