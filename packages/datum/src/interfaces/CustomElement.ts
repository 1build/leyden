import { Element as SlateElement } from 'slate';

import { ExtendedElementType, ExtendedType } from './CustomTypes';
import { DatumElementType, Keys } from '../types';

export type CustomElements = ExtendedType<'Elements'>;
export type CustomElementType = Keys<CustomElements>;
export type CustomElement<T extends CustomElementType> =
    ExtendedElementType<DatumElementType.Element, T, CustomElements>;

export const CustomElement = {
    /**
     * Check if an element is an `Element`.
     */

    isCustomElement: (el: SlateElement): el is CustomElement<CustomElementType> => (
        el.type === DatumElementType.Element
    ),
};
