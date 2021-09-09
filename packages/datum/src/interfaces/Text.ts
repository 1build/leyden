import { Text as SlateText } from 'slate';

import { ExtendedTextType, ExtendedType } from './CustomTypes';
import { Keys } from '../types';

export type Texts = ExtendedType<'Text'>;
export type TextType = Keys<Texts>;
export type Text<T extends TextType> = ExtendedTextType<T, Texts>;

export const Text = {
    /**
     * Check if a text is a `Text`.
     */

    isText: (txt: SlateText): txt is Text<TextType> => (
        Reflect.has(txt, 'type')
    ),
};
