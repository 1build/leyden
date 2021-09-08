import { em, px, rem, rgb } from 'csx';
import { style, stylesheet, types } from 'typestyle';

import { solidBorder } from '../styles/border';
import { gridPosition } from '../styles/grid';
import {
    afterPsuedoElement,
    basePsuedoElement,
    beforePsuedoElement,
    borderPsuedoElement,
} from '../styles/psuedo';

// HELPERS

const colors = {
    blue: rgb(26, 115, 232),
    gray: {
        dark: rgb(97, 101, 106),
        base: rgb(188, 188, 188),
        light: rgb(192, 192, 192),
        lighter: rgb(226, 227, 227),
        lightest: rgb(248, 249, 250),
    },
    white: rgb(255, 255, 255),
};

const fonts = {
    arial: 'Arial, Helvetica Neue, Helvetica, sans-serif',
};

// RAW CLASS NAMES

export const cellClass = 'datum-cell';

// EXTENDABLE STYLES

const baseCell: types.NestedCSSProperties = {
    padding: rem(0.25),
    cursor: 'default',
    position: 'relative',
    boxSizing: 'border-box',
    fontSize: 12,
    letterSpacing: em(0.05),
    backgroundColor: colors.white.toString(),
};

const headerCell: types.NestedCSSProperties = {
    ...baseCell,
    minHeight: rem(1.25),
    backgroundColor: colors.gray.lightest.toString(),
    border: 'none',
    font: 'inherit',
    outline: 'inherit',
    color: colors.gray.dark.toString(),
    fontSize: 10,
    textAlign: 'center',
    $nest: {
        ...beforePsuedoElement(
            borderPsuedoElement(1, 1, colors.gray.light)
        ),
    },
};

// STYLE GENERATORS

export const makeGridPositionClass = (
    col: number,
    row: number,
): string => style(gridPosition(col, row));

export const makeSheetGridTemplateClass = (
    cols: number,
    rows: number,
): string => style({
    gridTemplateColumns: `fit-content(1.5rem) repeat(${cols-1}, auto)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
});

export const makeNestedSelectedCellClass = (n: number): string => style({
    $nest: {
        [`div:nth-of-type(${n})`]: {
            $nest: {
                ...afterPsuedoElement({
                    ...basePsuedoElement,
                    cursor: 'crosshair',
                    bottom: -3,
                    right: -3,
                    height: 7,
                    width: 7,
                    backgroundColor: colors.blue.toString(),
                    borderTop: solidBorder(1, colors.white),
                    borderLeft: solidBorder(1, colors.white),
                    zIndex: 2,
                }),
                ...beforePsuedoElement(
                    borderPsuedoElement(1, 2, colors.blue)
                ),
            }
        }
    },
});

// PRIMARY STYLESHEET

export const css = stylesheet({
    sheet: {
        padding: px(1),
        position: 'relative',
        display: 'grid',
        gap: px(1),
        backgroundColor: colors.gray.lighter.toString(),
        alignItems: 'stretch',
        justifyItems: 'stretch',
        width: 'fit-content',
        fontFamily: fonts.arial,
    },
    cell: baseCell,
    originCell: {
        ...headerCell,
        ...gridPosition(1, 1),
        minWidth: rem(2.825),
        $nest: {
            ...headerCell.$nest,
            ...afterPsuedoElement({
                ...borderPsuedoElement(0, 4, colors.gray.base),
                borderTop: 'none',
                borderLeft: 'none',
            }),
        },
    },
    columnHeaderCell: {
        ...headerCell,
        minWidth: rem(6.25),
    },
    rowHeaderCell: headerCell,
    selectedCell: {
        ...baseCell,
        $nest: {
            ...afterPsuedoElement({
                ...basePsuedoElement,
                cursor: 'crosshair',
                bottom: -3,
                right: -3,
                height: 7,
                width: 7,
                backgroundColor: colors.blue.toString(),
                borderTop: solidBorder(1, colors.white),
                borderLeft: solidBorder(1, colors.white),
                zIndex: 2,
            }),
            ...beforePsuedoElement(
                borderPsuedoElement(1, 2, colors.blue)
            ),
        },
    },
});
