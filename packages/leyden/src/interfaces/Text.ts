import {
    InsertTextOperation,
    RemoveTextOperation,
    BaseText,
    Text as SlateText,
} from 'slate';

import {
    extendableComponentDefaultKey,
    ExtendableTypeIsExtended,
    ExtendedTextArgsType,
    ExtendedTextType,
    ExtendedType,
} from './CustomTypes';
import { Keys } from '../utils/types';
import { ValidationFunc } from '..';

export type TextIsExtended = ExtendableTypeIsExtended<'Text'>;
export type Texts = ExtendedType<'Text'>;
export type TextType = Keys<Texts>;

export type Text<T extends TextType> = ExtendedTextType<T, Texts>;

export type LeydenText = Text<TextType>;

export interface TextInterface {
    new: <T extends TextType>(
        type: T,
        text: Text<T>['text'],
        args: ExtendedTextArgsType<T, Texts>,
    ) => Text<T>;
    newDefault: (num: number) => Text<typeof extendableComponentDefaultKey>;
    isText: <T extends TextType=TextType>(
        text: BaseText,
        options?: {
            type?: T
        }
    ) => text is Text<T>;
    isTextLenient: <T extends TextType=TextType>(
        value: unknown,
        options?: {
            type?: T
        }
    ) => value is Text<T>;
    validateTextOperation: (
        text: Text<TextType>,
        validator: ValidationFunc,
        operation: InsertTextOperation|RemoveTextOperation
    ) => boolean;
}

export const Text: TextInterface = {
    /**
     * Create a new Text.
     */

    new<T extends TextType>(
        type: T,
        text: Text<T>['text'],
        args: ExtendedTextArgsType<T, Texts>,
    ): Text<T> {
        return {
            ...args,
            type,
            text,
        };
    },

    /**
     * Create a new text leaf using the default Text type.
     */

    newDefault(num: number): Text<typeof extendableComponentDefaultKey> {
        return {
            type: extendableComponentDefaultKey,
            text: num.toString(),
            validator: 'numeric',
        };
    },

    /**
     * Check if a text is a `Text`.
     */

    isText<T extends TextType=TextType>(
        text: BaseText,
        options: {
            type?: T
        } = {}
    ): text is Text<T> {
        const { type } = options;
        if (type === undefined) {
            const textType = Reflect.get(text, 'type');
            return typeof textType === 'string';
        }
        return Text.isText(text) && text.type === type;
    },

    /**
     * Check if an unknown value is a `Text`.
     * This is a more broad and therefore less performant `isText` variation.
     */

    isTextLenient<T extends TextType=TextType>(
        value: unknown,
        options: {
            type?: T
        } = {}
    ): value is Text<T> {
        return SlateText.isText(value) && Text.isText(value, options);
    },

    /**
     * Return true if the result of applying the an operation to a text is valid.
     */

    validateTextOperation(
        text: Text<TextType>,
        validator: ValidationFunc,
        operation: InsertTextOperation|RemoveTextOperation
    ): boolean {
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
