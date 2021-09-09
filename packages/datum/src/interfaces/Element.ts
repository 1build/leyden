import { Element as SlateElement } from 'slate';

import { ExtendedElementType, ExtendedType } from './CustomTypes';
import { DatumElementType, Keys } from '../types';

export type Elements = ExtendedType<'Elements'>;
export type ElementType = Keys<Elements>;
export type Element<T extends ElementType> = ExtendedElementType<DatumElementType.Element, T, Elements>;

export const Element = {
    /**
     * Check if an element is an `Element`.
     */

    isElement: (el: SlateElement): el is Element<ElementType> => (
        el.type === DatumElementType.Element
    ),
};