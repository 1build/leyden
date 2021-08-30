import { Text } from 'slate';

import { DatumText, TextType } from './types';

export interface FormattedText extends DatumText<TextType.FormattedText> {
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
