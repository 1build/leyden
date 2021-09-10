import {
    InsertTextOperation,
    RemoveTextOperation,
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
     * Return true if the result of applying the an operation to a text is valid.
     */

    validateTextOperation: (
        text: Text<TextType>,
        validator: ValidationFunc,
        operation: InsertTextOperation|RemoveTextOperation
    ): boolean => {
        const {
            offset,
            text: opText,
            type,
        } = operation;
        if (opText.length === 0) {
            return true;
        }
        if (type === 'insert_text') {
            return validator(
                text.text.slice(0, offset)
                + opText
                + text.text.slice(offset)
            );
        }
        return validator(
            text.text.slice(0, offset)
            + text.text.slice(offset + opText.length)
        );
    },
};
