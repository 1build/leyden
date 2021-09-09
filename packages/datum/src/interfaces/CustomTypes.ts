/**
 * Extendable Custom Types Interface
 *
 * Adapted from Slate's custom types:
 * https://github.com/ianstormtaylor/slate/blob/f5c0cbd7ecc016c970d4448f29111340fc235e7b/packages/slate/src/interfaces/custom-types.ts
 */

type ExtendableTypes =
    | 'Cells';

export interface CustomTypes {
    [key: string]: unknown;
}

export type ExtendedType<
    K extends ExtendableTypes,
    B
> = unknown extends CustomTypes[K]
    ? B
    : CustomTypes[K];
