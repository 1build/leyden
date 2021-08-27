import { style } from 'typestyle';

export const columnHeaderCellClass = style({
    backgroundColor: 'rgb(230, 230, 230)',
    color: 'rgba(75, 75, 75)',
    minWidth: '3rem',
    width: 'calc(100% - 0.5rem)',
    height: 'calc(100% - 0.5rem)',
    padding: '0.25rem',
    textAlign: 'center',
    fontSize: 10,
});

export const contentCellClass = style({
    backgroundColor: 'white',
    width: 'calc(100% - 0.5rem)',
    height: 'calc(100% - 0.5rem)',
    padding: '0.25rem',
    fontSize: 12,
    letterSpacing: '0.05em',
});

export const originCellClass = style({
    backgroundColor: 'rgb(230, 230, 230)',
    width: 'calc(100% - 3px)',
    height: 'calc(100% - 3px)',
    margin: '0 3px 3px 0',
});

export const rowHeaderCellClass = style({
    backgroundColor: 'rgb(230, 230, 230)',
    color: 'rgba(75, 75, 75)',
    minWidth: '2rem',
    width: 'calc(100% - 0.5rem)',
    height: 'calc(100% - 0.5rem)',
    padding: '0.25rem',
    textAlign: 'center',
    fontSize: 10,
});

export const makeTableClass = (
    columns: number,
    rows: number,
): string => style({
    display: 'grid',
    gridTemplateColumns: `fit-content(1.5rem) repeat(${columns-1}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '1px',
    backgroundColor: 'rgb(180, 180, 180)',
    alignItems: 'stretch',
    justifyItems: 'stretch',
    width: 'fit-content',
    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
    padding: '0 1px 1px 0',
});
