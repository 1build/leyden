/**
 * Extendable Custom Types Interface
 *
 * Adapted from Slate's custom types:
 * https://github.com/ianstormtaylor/slate/blob/f5c0cbd7ecc016c970d4448f29111340fc235e7b/packages/slate/src/interfaces/custom-types.ts
 */
import { Descendant, Text } from 'slate';

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

export interface CustomTypes {
    [key: string]: unknown;
}

interface ExtendedElementTypeEntry {
    children: Descendant[];
    data?: unknown;
    isEditable?: boolean;
}

interface ExtendedTextTypeEntry {
    text: string;
    validator?: Validator;
    data?: unknown;
}

interface BaseExtendedElementTypeEntry {
    children: Text[];
    data?: unknown;
    isEditable: false;
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
        : BaseExtendedElementTypeEntry;
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

type ExtractIsEditableProp<T extends ExtendedElementTypeEntry> =
    T extends { isEditable: infer D }
        ? D extends false
            ? { isEditable: false }
            : Record<string, unknown>
        : Record<string, unknown>;

export type ExtendedCellType<
    T extends string,
    R extends Record<T, ExtendedElementTypeEntry>
> = ExtractDataProp<R[T]> & ExtractIsEditableProp<R[T]> & {
    type: 'cell';
    children: R[T]['children'];
    cellType: T;
};

export type ExtendedElementsType<
    T extends string,
    R extends Record<T, ExtendedElementTypeEntry>
> = ExtractDataProp<R[T]> & ExtractIsEditableProp<R[T]> & {
    type: T;
    children: R[T]['children'];
};

export type ExtractTextValidator<T extends ExtendedTextTypeEntry> =
    T extends { validator: Validator }
        ? { validator: T['validator'] }
        : Record<string, unknown>;

export type ExtendedTextType<
    T extends string,
    R extends Record<T, ExtendedTextTypeEntry>
> = ExtractDataProp<R[T]> & ExtractTextValidator<R[T]> & {
    type: T;
    text: R[T]['text'];
};
