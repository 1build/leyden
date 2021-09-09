/**
 * Extendable Custom Types Interface
 *
 * Adapted from Slate's custom types:
 * https://github.com/ianstormtaylor/slate/blob/f5c0cbd7ecc016c970d4448f29111340fc235e7b/packages/slate/src/interfaces/custom-types.ts
 */

import { Descendant } from 'slate';

import { Validator } from './Validator';
import {
    DatumElementType,
    TypedElement,
    TypedText,
} from '../types';


type ExtendableElementTypes =
    | 'Elements'
    | 'Cells';

type ExtendableTextTypes =
    | 'Text';

type ExtendableComponentTypes =
    | ExtendableElementTypes
    | ExtendableTextTypes;

type ExtendableExtraTypes =
    | 'Validator';

type ExtendableTypes = 
    | ExtendableComponentTypes
    | ExtendableExtraTypes;

export interface CustomTypes {
    [key: string]: unknown;
}

export interface ExtendedElementTypeEntry {
    children: Descendant[];
    data?: unknown;
}

type ExtendedTextTypeEntry = {
    text: string;
    validator?: Validator;
    data?: unknown;
};

type ExtendedComponentTypeEntry<T extends ExtendableComponentTypes> =
    T extends ExtendableElementTypes
        ? ExtendedElementTypeEntry
        : T extends ExtendableTextTypes
            ? ExtendedTextTypeEntry
            : never;

type ExtendedComponentTypeEntries<T extends ExtendableComponentTypes> =
    Record<string, ExtendedComponentTypeEntry<T>>;

type BaseExtendedComponentTypeEntries<T extends ExtendableComponentTypes> = {
    default: ExtendedComponentTypeEntry<T>
};

export type ExtendedType<T extends ExtendableTypes> =
    CustomTypes[T] extends infer K
        ? T extends ExtendableComponentTypes
            ? K extends ExtendedComponentTypeEntries<T> 
                ? K
                : BaseExtendedComponentTypeEntries<T>
            : T extends 'Validator'
                ? K extends string
                    ? K
                    : 1
                : 2
        : never;

export type ExtendedElementType<
    E extends DatumElementType,
    T extends string,
    R extends Record<T, ExtendedElementTypeEntry>
> = R[T] extends { data: unknown }
    ? { subType: T; data: R[T]['data'] } & TypedElement<E, R[T]['children']>
    : { subType: T } & TypedElement<E, R[T]['children']>;

export type ExtractTextValidator<T extends ExtendedTextTypeEntry> =
    T extends { validator: Validator }
        ? { validator: T['validator'] }
        : Record<string, unknown>;

export type ExtractTextData<T extends ExtendedTextTypeEntry> =
    T extends { data: infer D }
        ? D
        : Record<string, unknown>;

export type ExtendedTextType<
    T extends string,
    R extends Record<T, ExtendedTextTypeEntry>
> = { type: T } & ExtractTextData<R[T]> & ExtractTextValidator<R[T]> & TypedText<R[T]['text']>;
