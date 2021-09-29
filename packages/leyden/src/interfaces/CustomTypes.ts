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

const extendableComponentDefaultKey = 'EXTENDABLE_COMPONENT_DEFAULT_KEY';

interface WithCellType<T extends string> { cellType: T }
interface WithChildren<T extends Array<unknown>> { children: T }
interface WithData<T> { data: T }
interface WithDataOptional<T> { data?: T }
interface WithIsEditable<T extends boolean> { isEditable: T }
interface WithIsEditableOptional<T extends boolean> { isEditable?: T }
interface WithText<T extends string> { text: T }
interface WithType<T extends string> { type: T }
interface WithValidator<T extends Validator> { validator: T }
interface WithValidatorOptional<T extends Validator> { validator?: T }

interface ExtendedElementTypeEntry extends
    WithChildren<Array<unknown>>,
    WithDataOptional<unknown>,
    WithIsEditableOptional<boolean> {}

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
        : WithChildren<Text[]> & WithDataOptional<unknown> & WithIsEditable<false>;
};

type EmptyProp = Record<string, unknown>;

type ExtractDataProp<T extends ExtendedElementTypeEntry|ExtendedTextTypeEntry> =
    T extends WithData<infer U>
        ? U
        : EmptyProp;

type WithIsEditableProp<T extends ExtendedElementTypeEntry> =
    T extends WithIsEditable<infer U>
        ? U extends false
            ? WithIsEditable<U>
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
    CustomTypes[T] extends infer K
        ? K extends undefined
            ? false
            : true
        : false;

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

export type ExtendedElementsType<T extends string, R extends Record<T, ExtendedElementTypeEntry>> =
    & ExtractDataProp<R[T]>
    & WithChildren<R[T]['children']>
    & WithIsEditableProp<R[T]>
    & WithType<T>;

export type ExtendedCellType<T extends string, R extends Record<T, ExtendedElementTypeEntry>> =
    & ExtractDataProp<R[T]>
    & WithCellType<T>
    & WithChildren<R[T]['children']>
    & WithIsEditableProp<R[T]>
    & WithType<'cell'>;

export type ExtendedTextType<T extends string, R extends Record<T, ExtendedTextTypeEntry>> =
    & ExtractDataProp<R[T]>
    & WithText<R[T]['text']>
    & WithType<T>
    & WithValidatorProp<R[T]>;
