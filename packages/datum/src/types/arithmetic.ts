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
    number extends L
        ? T[]
        : L extends L // distribute over union
            ? PowersOfTwoLengthTuples<T, L, [[T]]> extends infer U
                ? U extends T[][]
                    ? TupleOfCombinedPowersOfTwo<T, L, U, []>
                    : never
                : never
            : never

type Input = TupleOf<unknown, number>|number;

type Tuple<T extends Input> =
    T extends TupleOf<unknown, number>
        ? { [K in keyof T]: never } // ensure that all values are never for spread comparisons (subtraction)
        : T extends number
            ? TupleOf<never, T>
            : never;

type Value<T extends Input> =
    T extends number
        ? T
        : T extends { length: infer L }
            ? L extends number
                ? L
                : never
            : never;

export type Add<A extends Input, B extends Input> = 
    Value<[...Tuple<A>, ...Tuple<B>]>;

export type Subtract<A extends Input, B extends Input> = 
    Tuple<A> extends [...(infer U), ...Tuple<B>]
        ? Value<U>
        : never;

export type Equals<A extends Input, B extends Input> =
    Value<A> extends infer AVal
        ? Value<B> extends infer BVal
            ? AVal extends BVal
                ? BVal extends AVal
                    ? true
                    : false
                : false
            : never
        : never;

type MultiplyRecursive<Multiplier extends Input, Multiplicand extends Input, Product extends number=0> =
    Equals<Multiplier, 0> extends true
        ? Product
        : MultiplyRecursive<Subtract<Multiplier, 1>, Multiplicand, Add<Multiplicand, Product>>;

export type Multiply<Multiplier extends Input, Multiplicand extends Input> =
    Multiplier extends Multiplier
        ? Multiplicand extends Multiplicand
            ? MultiplyRecursive<Multiplier, Multiplicand>
            : never
        : never;
