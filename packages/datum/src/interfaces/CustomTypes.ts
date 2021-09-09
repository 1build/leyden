/**
 * Extendable Custom Types Interface
 *
 * Adapted from Slate's custom types:
 * https://github.com/ianstormtaylor/slate/blob/f5c0cbd7ecc016c970d4448f29111340fc235e7b/packages/slate/src/interfaces/custom-types.ts
 */

import { Descendant } from 'slate';

import { DatumElementType, TypedElement } from '../types';


type ExtendableElementTypes =
    | 'Elements'
    | 'Cells';

type ExtendableTextTypes =
    | 'Texts';

type ExtendableTypes = 
    | ExtendableElementTypes
    | ExtendableTextTypes;

export interface CustomTypes {
    [key: string]: unknown;
}

interface ExtendedElementTypeEntry {
    children: Descendant[];
    data?: unknown;
}

type ExtendedTextTypeEntry = {
    text: string;
    data?: unknown;
};

type ExtendedTypeEntry<T extends ExtendableTypes> =
    T extends ExtendableElementTypes
        ? ExtendedElementTypeEntry
        : T extends ExtendableTextTypes
            ? ExtendedTextTypeEntry
            : never;

type ExtendedTypeEntries<T extends ExtendableTypes> =
    Record<string, ExtendedTypeEntry<T>>;

type BaseExtendedTypeEntries<T extends ExtendableTypes> = {
    default: ExtendedTypeEntry<T>
};

export type ExtendedType<T extends ExtendableTypes> =
    CustomTypes[T] extends infer K
        ? K extends ExtendedTypeEntries<T> 
            ? K
            : BaseExtendedTypeEntries<T>
        : BaseExtendedTypeEntries<T>;

export type ExtendedElementType<
    E extends DatumElementType,
    T extends string,
    R extends Record<T, ExtendedElementTypeEntry>
> = R[T] extends { data: unknown }
    ? { subType: T; data: R[T]['data'] } & TypedElement<E, R[T]['children']>
    : { subType: T } & TypedElement<E, R[T]['children']>;
