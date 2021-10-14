/**
 * Extendable Custom Types Interface
 *
 * Adapted from Slate's custom types:
 * https://github.com/ianstormtaylor/slate/blob/f5c0cbd7ecc016c970d4448f29111340fc235e7b/packages/slate/src/interfaces/custom-types.ts
 */
import { Text } from 'slate';

import { Validator } from './Validator';

type ExtendableComponentTypes =
    | 'Cells'
    | 'Elements'
    | 'Text';

type ExtendableExtraTypes =
    | 'Validator';

type ExtendableTypes = 
    | ExtendableComponentTypes
    | ExtendableExtraTypes;

export const extendableComponentDefaultKey = 'EXTENDABLE_COMPONENT_DEFAULT_KEY';

interface WithCellType<T extends string> { cellType: T }
interface WithChildren<T extends Array<unknown>> { children: T }
interface WithData<T> { data: T }
interface WithDataOptional<T> { data?: T }
interface WithIsInline<T extends boolean> { isInline: T }
interface WithIsInlineOptional<T extends boolean> { isInline?: T }
interface WithIsVoid<T extends boolean> { isVoid: T }
interface WithIsVoidOptional<T extends boolean> { isVoid?: T }
interface WithText<T extends string> { text: T }
interface WithType<T extends string> { type: T }
interface WithValidator<T extends Validator> { validator: T }
interface WithValidatorOptional<T extends Validator> { validator?: T }

interface ExtendedElementTypeEntry extends
    WithChildren<Array<unknown>>,
    WithDataOptional<unknown>,
    WithIsInlineOptional<boolean>,
    WithIsVoidOptional<boolean> {}

interface ExtendedTextTypeEntry extends
    WithDataOptional<unknown>,
    WithText<string>,
    WithValidatorOptional<Validator> {}

type ExtendedComponentTypeEntry<T extends ExtendableComponentTypes> =
    T extends 'Text'
        ? ExtendedTextTypeEntry
        : ExtendedElementTypeEntry;

type ExtendedComponentTypeEntries<T extends ExtendableComponentTypes> =
    Record<string, ExtendedComponentTypeEntry<T>>;

type DefaultExtendedComponentTypeEntries<T extends ExtendableComponentTypes> = {
    [extendableComponentDefaultKey]: T extends 'Text'
        ? WithText<string> & WithValidator<'numeric'>
        : T extends 'Cells'
            ? WithChildren<Text[]> & WithDataOptional<unknown> & WithIsVoid<false> & WithIsInline<false>
            : WithChildren<Text[]> & WithDataOptional<unknown> & WithIsVoid<true> & WithIsInline<true>;
};

type EmptyProp = Record<string, unknown>;

type ExtractDataProp<T extends ExtendedElementTypeEntry|ExtendedTextTypeEntry> =
    T extends WithData<infer U>
        ? U
        : EmptyProp;

type WithIsInlineProp<T extends ExtendedElementTypeEntry> =
    T extends WithIsInline<infer U>
        ? U extends true
            ? WithIsInline<U>
            : EmptyProp
        : EmptyProp;

type WithIsVoidProp<T extends ExtendedElementTypeEntry> =
    T extends WithIsVoid<infer U>
        ? U extends true
            ? WithIsVoid<U>
            : EmptyProp
        : EmptyProp;

type WithValidatorProp<T extends ExtendedTextTypeEntry> =
    T extends WithValidator<infer U>
        ? WithValidator<U>
        : EmptyProp;


export interface CustomTypes {
    [key: string]: unknown;
}

export type ExtendableTypeIsExtended<T extends ExtendableTypes> =
    unknown extends CustomTypes[T]
        ? false
        : true;

export type ExtendedType<T extends ExtendableTypes> =
    CustomTypes[T] extends infer K
        ? T extends ExtendableComponentTypes
            ? K extends ExtendedComponentTypeEntries<T> 
                ? K
                : DefaultExtendedComponentTypeEntries<T>
            : T extends 'Validator'
                ? K extends string
                    ? K
                    : never
                : never
        : never;

export type ExtendedElementsArgsType<T extends string, R extends Record<T, ExtendedElementTypeEntry>> =
    & ExtractDataProp<R[T]>
    & WithIsInlineProp<R[T]>
    & WithIsVoidProp<R[T]>;

export type ExtendedElementsType<T extends string, R extends Record<T, ExtendedElementTypeEntry>> =
    & ExtendedElementsArgsType<T, R>
    & WithChildren<R[T]['children']>
    & WithType<T>;

export type ExtendedCellArgsType<T extends string, R extends Record<T, ExtendedElementTypeEntry>> =
    & ExtractDataProp<R[T]>
    & WithIsInlineProp<R[T]>
    & WithIsVoidProp<R[T]>;

export type ExtendedCellType<T extends string, R extends Record<T, ExtendedElementTypeEntry>> =
    & ExtendedCellArgsType<T, R>
    & WithChildren<R[T]['children']>
    & WithCellType<T>
    & WithType<'cell'>;

export type ExtendedTextArgsType<T extends string, R extends Record<T, ExtendedTextTypeEntry>> =
    & ExtractDataProp<R[T]>
    & WithValidatorProp<R[T]>;

export type ExtendedTextType<T extends string, R extends Record<T, ExtendedTextTypeEntry>> =
    & ExtendedTextArgsType<T, R>
    & WithText<R[T]['text']>
    & WithType<T>;
