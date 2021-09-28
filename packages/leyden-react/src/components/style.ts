import { CSSProperties } from 'react';

export const makeGridPositionStyle = (
    col: number,
    row: number,
): CSSProperties => ({
    gridColumn: `${col} / ${col+1}`,
    gridRow: `${row} / ${row+1}`,
});

export const makeSheetGridTemplateStyle = (
    cols: number,
    cellGap: number,
): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, auto)`,
    gridTemplateRows: 'auto',
    position: 'relative',
    gap: `${cellGap}px`,
    alignItems: 'stretch',
    justifyItems: 'stretch',
});

export const stickyHeaderStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 10,
};
