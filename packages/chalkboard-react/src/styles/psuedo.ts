import { ColorHelper } from 'csx';
import { types } from 'typestyle';

import { solidBorder } from './border';

export const basePsuedoElement: types.NestedCSSProperties = {
    content: '\'\'',
    position: 'absolute',
};

export const afterPsuedoElement = (
    style: types.NestedCSSProperties,
): types.NestedCSSSelectors => ({
    '&::after': style,
});

export const beforePsuedoElement = (
    style: types.NestedCSSProperties,
): types.NestedCSSSelectors => ({
    '&::before': style,
});

export const borderPsuedoElement = (
    offset: number,
    width: number,
    color: ColorHelper,
): types.NestedCSSProperties => {
    const offsetVal = offset*-1;
    return {
        ...basePsuedoElement,
        boxSizing: 'border-box',
        top: offsetVal,
        left: offsetVal,
        bottom: offsetVal,
        right: offsetVal,
        border: solidBorder(width, color),
    };
};
