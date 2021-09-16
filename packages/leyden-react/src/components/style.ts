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
    cellGap: number,
): string => style({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, auto)`,
    gridTemplateRows: 'auto',
    position: 'relative',
    gap: `${cellGap}px`,
    alignItems: 'stretch',
    justifyItems: 'stretch',
});

export const stickyHeaderClass = style({
    position: 'sticky',
    top: 0,
    zIndex: 10,
});
