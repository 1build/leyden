import { Text } from 'slate';

import { TypedText, TextType } from './types';

export interface FormattedText extends TypedText<TextType.FormattedText> {
    bold?: boolean;
}

const isFormattedText = (value: Text): value is FormattedText => (
    Text.isText(value) && value.type === TextType.FormattedText
);

export const FormattedText = {
    /**
     * Check if text is `FormattedText`.
     */

    isFormattedText,
};
