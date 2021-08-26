import { Text } from 'slate';

import {
    DatumText,
    TextType,
} from '.';

export type FormattedText = DatumText<TextType.FormattedText>;

export interface FormattedTextInterface {
    isFormattedText: (value: any) => value is FormattedText;
}

const isFormattedText = (value: any): value is FormattedText => (
    Text.isText(value) && value.type === TextType.FormattedText
)

export const FormattedText: FormattedTextInterface = {
    /**
     * Check if a value implements the `FormattedText` interface.
     */

    isFormattedText,
}
