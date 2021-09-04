import { Descendant } from 'slate';

export enum ElementType {
    Cell,
    Selection,
    Sheet,
}

export interface TypedElement<T extends ElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

export enum TextType {
    FormattedText,
    Void,
}

export interface TypedText<T extends TextType, C extends string=string> {
    type: T;
    text: C;
}

export enum Direction2D {
    Up,
    Right,
    Down,
    Left,
}

/**
 * An array of all `T` tuples of length `2^x`, where `2^x<=L`
 *
 * T - tuple entry type
 * L - static cap on the length of tuples included in `R`
 * R - recursively expanding solution array of tuples of `2^x` length
 */
type PowersOfTwoLengthTuples<T, L extends number, R extends T[][]> =
    [...R[0], ...R[0]] extends infer U
        ? U extends T[]
            ? U[L] extends T // test: (length of next power of two candidate) > `L`
                ? R // base case
                : PowersOfTwoLengthTuples<T, L, [U, ...R]>
            : never
        : never;

/**
 * A `T` tuple of length `L`, made by combining the largest members of `R` until length `L` is reached
 *
 * T - tuple entry type
 * L - static tuple length target
 * R - recursively shrinking array of tuples of length `2^x` from which to construct `B`
 * B - recursively expanding solution tuple with target length `L`
 */
type TupleOfCombinedPowersOfTwo<T, L extends number, R extends T[][], B extends T[]> =
    B['length'] extends L
        ? B // base case (tuple of length `L` created)
        : TupleOfCombinedPowersOfTwo<T, L, R extends [R[0], ...infer U] // omit first `R` entry in next loop
            ? U extends T[][]
                ? U
                : never
            : never,
        [...R[0], ...B][L] extends T // test: ((length of to-be-omitted `R` entry) + (length of `B`)) > `L`
            ? B
            : [...R[0], ...B]>;

/**
 * A `T` tuple of length `L`
 *
 * T - tuple entry type
 * L - tuple length
 *
 * Adapted from:
 * https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674514787
 */
export type TupleOf<T, L extends number> =
    L extends L // distribute over union
        ? PowersOfTwoLengthTuples<T, L, [[T]]> extends infer U
            ? U extends T[][]
                ? TupleOfCombinedPowersOfTwo<T, L, U, []>
                : never
            : never
        : never
