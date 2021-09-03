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
 * An array of all `T` tuples of length `2^x`, where `2^x<=N`
 *
 * T - tuple entry type
 * N - static cap on the length of tuples included in `R`
 * R - recursively expanding solution array of tuples of `2^x` length
 **/
type PowersOfTwoLengthTuples<T, N extends number, R extends T[][]> =
    R[0][N] extends T
        ? R extends [R[0], ...infer U]
            ? U extends T[][]
                ? U
                : never
            : never
        : PowersOfTwoLengthTuples<T, N, [[...R[0], ...R[0]], ...R]>;

/**
 * A `T` tuple of length `N`, made by combining the largest members of `R` until length `N` is reached
 *
 * T - tuple entry type
 * N - static tuple length target
 * R - recursively shrinking array of tuples of length `2^x` from which to construct `B`
 * B - recursively expanding solution tuple with target length `N`
 */
type TupleOfCombinedPowersOfTwo<T, N extends number, R extends T[][], B extends T[]> =
    B['length'] extends N
        ? B
        : TupleOfCombinedPowersOfTwo<T, N, R extends [R[0], ...infer U]
            ? U extends T[][]
                ? U
                : never
            : never,
        [...R[0], ...B][N] extends T
            ? B
            : [...R[0], ...B]>;

/**
 * A `T` tuple of length `N`
 *
 * T - tuple entry type
 * N - tuple length
 *
 * Adapted from:
 * https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674514787
 */
export type TupleOf<T, N extends number> = {
    [K in N]: PowersOfTwoLengthTuples<T, K, [[T]]> extends infer U
        ? U extends T[][]
            ? TupleOfCombinedPowersOfTwo<T, K, U, []>
            : never
        : never;
}[N];
