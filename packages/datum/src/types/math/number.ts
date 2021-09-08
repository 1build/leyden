import { Not } from './boolean';
import { TupleOf } from './tuple';

/**
 * Standard number input: raw number or arbitrary-length tuple
 */
export type Num = TupleOf<unknown, number>|number;

/**
 * `never`-filled tuple of length `X` 
 */
export type NumTuple<X extends Num> =
    X extends TupleOf<unknown, number>
        ? { [K in keyof X]: never }
        : X extends number
            ? TupleOf<never, X>
            : never;

/**
 * Numeric value of any number input
 */
export type NumBuffer<X extends Num> =
    X extends number
        ? X
        : X extends { length: infer L }
            ? L extends number
                ? L
                : never
            : never;

/**
 * `X+Y`
 */
export type Add<X extends Num, Y extends Num> = 
    NumBuffer<[...NumTuple<X>, ...NumTuple<Y>]>;

/**
 * `X-Y`
 */
export type Subtract<X extends Num, Y extends Num> = 
    NumTuple<X> extends [...(infer U), ...NumTuple<Y>]
        ? NumBuffer<U>
        : 0;

type MultiplyRecursive<Multiplier extends Num, Multiplicand extends Num, Product extends number=0> =
    NumEquals<Multiplier, 0> extends true
        ? Product
        : MultiplyRecursive<Subtract<Multiplier, 1>, Multiplicand, Add<Multiplicand, Product>>;

/**
 * `Multiplier*Multiplicand`
 */
export type Multiply<Multiplier extends Num, Multiplicand extends Num> =
    Multiplier extends Multiplier
        ? Multiplicand extends Multiplicand
            ? MultiplyRecursive<Multiplier, Multiplicand>
            : never
        : never;

/**
 * `X==Y`
 */
export type NumEquals<X extends Num, Y extends Num> =
    NumBuffer<X> extends infer XVal
        ? NumBuffer<Y> extends infer YVal
            ? XVal extends YVal
                ? YVal extends XVal
                    ? true
                    : false
                : false
            : never
        : never;

/**
 * `X<=Y`
 */
export type LessThanOrEqual<X extends Num, Y extends Num> =
    Subtract<X, Y> extends infer U
        ? U extends number
            ? NumEquals<U, 0>
            : never
        : never;

/**
 * `X<Y`
 */
export type LessThan<X extends Num, Y extends Num> =
    LessThanOrEqual<Add<X, 1>, Y>;

/**
 * `X>=Y`
 */
export type GreaterThanOrEqual<X extends Num, Y extends Num> =
    Not<LessThan<X, Y>>;

/**
 * `X>Y`
 */
export type GreaterThan<X extends Num, Y extends Num> =
    Not<LessThanOrEqual<X, Y>>;

/**
 * `X` for all `X<Max`, `never` otherwise
 *
 * usage example:
 * ```ts
 * export interface GimmeLessThanFive<A extends Num> {
 *     num: NumLessThan<5, A>;
 * }
 *
 * // OK
 * export const foo: GimmeLessThanFive<4> = {
 *     num: 4,
 * };
 *
 * // Error
 *  export const foo: GimmeLessThanFive<6> = {
 *     num: 6,
 * };
 * ```
 */
export type NumLessThan<Max extends Num, X extends Num> =
    NumTuple<Max>[NumBuffer<X>] extends never
        ? NumBuffer<X>
        : never;

/**
 * `X` for all `X>Max`, `never` otherwise
 *
 * usage example:
 * ```ts
 * export interface GimmeMoreThanFive<A extends Num> {
 *     num: NumLessThan<5, A>;
 * }
 *
 * // OK
 * export const foo: GimmeMoreThanFive<6> = {
 *     num: 6,
 * };
 *
 * // Error
 *  export const foo: GimmeMoreThanFive<4> = {
 *     num: 4,
 * };
 * ```
 */
export type NumMoreThan<Min extends Num, A extends Num> =
    NumTuple<A>[NumBuffer<Min>] extends never
        ? NumBuffer<A>
        : never;
