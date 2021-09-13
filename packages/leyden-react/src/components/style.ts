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
    borderColor: string,
    borderThickness: number,
): string => style({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    padding: `${borderThickness}px`,
    position: 'relative',
    gap: `${borderThickness}px`,
    backgroundColor: borderColor,
    alignItems: 'stretch',
    justifyItems: 'stretch',
    width: 'fit-content',
});
