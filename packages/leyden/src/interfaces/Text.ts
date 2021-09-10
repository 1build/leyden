import {
    InsertTextOperation,
    Text as SlateText,
} from 'slate';

import { ExtendedTextType, ExtendedType } from './CustomTypes';
import { Keys } from '../types';
import { ValidationFunc } from '..';

export type Texts = ExtendedType<'Text'>;
export type TextType = Keys<Texts>;

export type Text<T extends TextType> = ExtendedTextType<T, Texts>;

export const Text = {
    /**
     * Check if a text is a `Text`.
     */

    isText: (text: SlateText): text is Text<TextType> => (
        Reflect.has(text, 'type')
    ),

    /**
     * Return true if an insertion operation will not invalidate the text.
     */

    validateInsertion: (
        text: Text<TextType>,
        offset: InsertTextOperation['offset'],
        insertionText: InsertTextOperation['text'],
        validator: ValidationFunc
    ): boolean => {
        if (insertionText.length === 0) {
            return true;
        }
        const before = text.text.slice(0, offset);
        const after = text.text.slice(offset);
        return validator(before + insertionText + after);
    },
};
