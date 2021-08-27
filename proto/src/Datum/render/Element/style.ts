import { style } from 'typestyle';

export const columnHeaderCellClass = style({
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
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

export const rowHeaderCellClass = style({
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    color: 'rgba(75, 75, 75)',
    minWidth: '2rem',
    width: 'calc(100% - 0.5rem)',
    height: 'calc(100% - 0.5rem)',
    padding: '0.25rem',
    textAlign: 'center',
    fontSize: 10,
});

export const originCellClass = style({
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
});
