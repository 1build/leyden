export enum TextType {
    FormattedText,
    Void,
}

export interface DatumText<T extends TextType, C extends string=string> {
    type: T;
    text: C;
}

export type SlateDatumText = DatumText<TextType>;