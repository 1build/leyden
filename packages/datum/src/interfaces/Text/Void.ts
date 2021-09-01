import { Text } from 'slate';

import {
    TypedText,
    TextType,
} from './types';

export type Void = TypedText<TextType.Void>;

const isVoid = (value: Text): value is Void => (
    Text.isText(value) && value.type === TextType.Void
);

export const Void = {
    /**
     * Check if text is `Void`.
     */

    isVoid,
};
