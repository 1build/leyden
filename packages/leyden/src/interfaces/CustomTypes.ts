/**
 * Extendable Custom Types Interface
 *
 * Adapted from Slate's custom types:
 * https://github.com/ianstormtaylor/slate/blob/f5c0cbd7ecc016c970d4448f29111340fc235e7b/packages/slate/src/interfaces/custom-types.ts
 */

import { Descendant } from 'slate';

import { Validator } from './Validator';
import {
    TypedElement,
    TypedText,
} from '../types';

type ExtendableComponentTypes =
    | 'Cells'
    | 'Elements'
    | 'Text';

type ExtendableExtraTypes =
    | 'Validator';

type ExtendableTypes = 
    | ExtendableComponentTypes
    | ExtendableExtraTypes;

export interface CustomTypes {
    [key: string]: unknown;
}

interface ExtendedElementTypeEntry {
    children: Descendant[];
    data?: unknown;
}

interface ExtendedTextTypeEntry {
    text: string;
    validator?: Validator;
    data?: unknown;
}

type BaseExtendedTextTypeEntry = {
    text: string;
    validator: 'numeric';
};

type ExtendedComponentTypeEntry<T extends ExtendableComponentTypes> =
    T extends 'Text'
        ? ExtendedTextTypeEntry
        : ExtendedElementTypeEntry;

type ExtendedComponentTypeEntries<T extends ExtendableComponentTypes> =
    Record<string, ExtendedComponentTypeEntry<T>>;

type BaseExtendedComponentTypeEntries<T extends ExtendableComponentTypes> = {
    default: T extends 'Text'
        ? BaseExtendedTextTypeEntry
        : ExtendedElementTypeEntry;
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
                    : never
                : never
        : never;

type ExtractDataProp<T extends ExtendedElementTypeEntry|ExtendedTextTypeEntry> =
    T extends { data: infer D }
        ? D
        : Record<string, unknown>;

export type ExtendedCellType<
    T extends string,
    R extends Record<T, ExtendedElementTypeEntry>
> = { type: 'cell'; cellType: T } & ExtractDataProp<R[T]> & TypedElement<R[T]['children']>;

export type ExtendedElementsType<
    T extends string,
    R extends Record<T, ExtendedElementTypeEntry>
> = { type: T } & ExtractDataProp<R[T]> & TypedElement<R[T]['children']>;

export type ExtractTextValidator<T extends ExtendedTextTypeEntry> =
    T extends { validator: Validator }
        ? { validator: T['validator'] }
        : Record<string, unknown>;

export type ExtendedTextType<
    T extends string,
    R extends Record<T, ExtendedTextTypeEntry>
> = { type: T } & ExtractDataProp<R[T]> & ExtractTextValidator<R[T]> & TypedText<R[T]['text']>;
