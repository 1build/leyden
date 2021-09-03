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
 * All `T` tuples of length `2^x`, where `2^x<=N`
 *
 * T - tuple entry type
 * N - static length of longest tuple
 * R - recursively expanding array of `never` tuples
 **/
type BuildPowersOf2LengthArrays<T, N extends number, R extends T[][]> = R[0][N] extends T
    ? R extends [R[0], ...infer U]
        ? U extends T[][]
            ? U
            : never
        : never
    : BuildPowersOf2LengthArrays<T, N, [[...R[0], ...R[0]], ...R]>;

/**
 * A `T` tuple of length `N`, made by combining the largest members of `R` until length `N` is reached
 *
 * T - tuple entry type
 * N - static tuple length target
 * R - array of `T` tuples of length 2^x from which to construct B
 * B - solution `T` tuple, grows recursively until length `N`
 */
type ConcatLargestUntilDone<T, N extends number, R extends T[][], B extends T[]> = B['length'] extends N
    ? B
    : [...R[0], ...B][N] extends T
        ? ConcatLargestUntilDone<T, N, R extends [R[0], ...infer U]
            ? U extends T[][]
                ? U
                : never
            : never, B>
        : ConcatLargestUntilDone<T, N, R extends [R[0], ...infer U]
            ? U extends T[][]
                ? U
                : never
            : never, [...R[0], ...B]>;

/**
 * A `T` tuple of length `N`
 *
 * T - tuple entry type
 * N - tuple length
 */
export type TupleOf<T, N extends number> = {
    [K in N]: BuildPowersOf2LengthArrays<T, K, [[T]]> extends infer U
        ? U extends T[][]
            ? ConcatLargestUntilDone<T, K, U, []>
            : never
        : never;
}[N];
