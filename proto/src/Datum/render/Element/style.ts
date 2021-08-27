import { style } from 'typestyle';

export const selectedCellClass = style({
    $nest: {
        '&::before': {
            content: '\'\'',
            position: 'absolute',
            top: -1,
            left: -1,
            bottom: -1,
            right: -1,
            boxSizing: 'border-box',
            border: '2px solid #1a73e8',
        },
        '&::after': {
            content: '\'\'',
            position: 'absolute',
            bottom: -3,
            right: -3,
            height: 7,
            width: 7,
            boxSizing: 'border-box',
            backgroundColor: '#1a73e8',
            borderTop: '1px solid white',
            borderLeft: '1px solid white',
            zIndex: 2,
        }
    },
});

export const columnHeaderCellClass = style({
    position: 'relative',
    backgroundColor: 'rgb(230, 230, 230)',
    boxSizing: 'border-box',
    color: 'rgba(75, 75, 75)',
    minWidth: '3rem',
    width: '100%',
    height: '100%',
    padding: '0.25rem',
    textAlign: 'center',
    fontSize: 10,
    $nest: {
        '&::before': {
            content: '\'\'',
            position: 'absolute',
            top: -1,
            left: -1,
            bottom: -1,
            right: -1,
            boxSizing: 'border-box',
            border: '1px solid #c0c0c0',
        },
    }
});

export const contentCellClass = style({
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: '0.25rem',
    fontSize: 12,
    letterSpacing: '0.05em',
});

export const originCellClass = style({
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(230, 230, 230)',
    width: '100%',
    height: '100%',
    margin: '0 3px 3px 0',
});

export const rowHeaderCellClass = style({
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(230, 230, 230)',
    color: 'rgba(75, 75, 75)',
    minWidth: '2rem',
    width: '100%',
    height: '100%',
    padding: '0.25rem',
    textAlign: 'center',
    fontSize: 10,
    $nest: {
        '&::before': {
            content: '\'\'',
            position: 'absolute',
            top: -1,
            left: -1,
            bottom: -1,
            right: -1,
            boxSizing: 'border-box',
            border: '1px solid #c0c0c0',
        },
    }
});

export const makeTableClass = (
    columns: number,
    rows: number,
): string => style({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: `fit-content(1.5rem) repeat(${columns-1}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '1px',
    backgroundColor: 'rgb(226,227,227)',
    alignItems: 'stretch',
    justifyItems: 'stretch',
    width: 'fit-content',
    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
    padding: '0 1px 1px 0',
});
