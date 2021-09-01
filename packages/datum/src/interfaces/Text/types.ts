export enum TextType {
    FormattedText,
    Void,
}

export interface TypedText<T extends TextType, C extends string=string> {
    type: T;
    text: C;
}

export type DatumText = TypedText<TextType>;
