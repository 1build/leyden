import { Text } from 'slate';

import {
    DatumText,
    TextType,
} from '.';

export type Void = DatumText<TextType.Void>;

export interface VoidInterface {
    isVoid: (value: any) => value is Void;
}

const isVoid = (value: any): value is Void => (
    Text.isText(value) && value.type === TextType.Void
)

export const Void: VoidInterface = {
    /**
     * Check if a value implements the `Void` interface.
     */

    isVoid,
}
