import { types } from 'typestyle';

export const gridPosition = (
    col: number,
    row: number,
): types.NestedCSSProperties => ({
    gridColumn: `${col} / ${col+1}`,
    gridRow: `${row} / ${row+1}`,
});
