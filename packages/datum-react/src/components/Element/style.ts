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
            cursor: 'crosshair',
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
    backgroundColor: '#f8f9fa',
    boxSizing: 'border-box',
    color: '#61656a',
    minWidth: '6.875rem',
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
    cursor: 'default',
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
    backgroundColor: '#f8f9fa',
    minHeight: '1.25rem',
    minWidth: '2.825rem',
    width: '100%',
    height: '100%',
    gridRow: '1 / 2',
    gridColumn: '1 / 2',
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
        '&::after': {
            content: '\'\'',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            boxSizing: 'border-box',
            borderBottom: '4px solid #bcbcbc',
            borderRight: '4px solid #bcbcbc',
        },
    }
});

export const rowHeaderCellClass = style({
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: '#f8f9fa',
    color: '#61656a',
    minWidth: '2rem',
    minHeight: '1.25rem',
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

export const makeSheetClass = (
    cols: number,
    rows: number,
): string => style({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: `fit-content(1.5rem) repeat(${cols-1}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '1px',
    backgroundColor: 'rgb(226,227,227)',
    alignItems: 'stretch',
    justifyItems: 'stretch',
    width: 'fit-content',
    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
    padding: '0 1px 1px 0',
});
