import { style } from 'typestyle';

export const makeGridPositionClass = (
    col: number,
    row: number,
): string => style({
    gridColumn: `${col} / ${col+1}`,
    gridRow: `${row} / ${row+1}`,
});

export const makeSheetGridTemplateClass = (
    cols: number,
    rows: number,
    cellGap: number,
): string => style({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    padding: `${cellGap}px`,
    position: 'relative',
    gap: `${cellGap}px`,
    alignItems: 'stretch',
    justifyItems: 'stretch',
});
