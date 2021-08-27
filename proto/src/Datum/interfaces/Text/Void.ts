import { Text } from 'slate';

import {
    DatumText,
    TextType,
} from '.';

export type Void = DatumText<TextType.Void>;

const isVoid = (value: Text): value is Void => (
    Text.isText(value) && value.type === TextType.Void
);

export const Void = {
    /**
     * Check if text is `Void`.
     */

    isVoid,
};
