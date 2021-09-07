import { Not } from './boolean';
import { TupleOf } from './tuple';

export type Num = TupleOf<unknown, number>|number;

export type NumTuple<T extends Num> =
    T extends TupleOf<unknown, number>
        ? { [K in keyof T]: never } // ensure that all values are never for spread comparisons (subtraction)
        : T extends number
            ? TupleOf<never, T>
            : never;

export type NumBuffer<T extends Num> =
    T extends number
        ? T
        : T extends { length: infer L }
            ? L extends number
                ? L
                : never
            : never;

export type Add<A extends Num, B extends Num> = 
    NumBuffer<[...NumTuple<A>, ...NumTuple<B>]>;

export type Subtract<A extends Num, B extends Num> = 
    NumTuple<A> extends [...(infer U), ...NumTuple<B>]
        ? NumBuffer<U>
        : 0;

type MultiplyRecursive<Multiplier extends Num, Multiplicand extends Num, Product extends number=0> =
    NumEquals<Multiplier, 0> extends true
        ? Product
        : MultiplyRecursive<Subtract<Multiplier, 1>, Multiplicand, Add<Multiplicand, Product>>;

export type Multiply<Multiplier extends Num, Multiplicand extends Num> =
    Multiplier extends Multiplier
        ? Multiplicand extends Multiplicand
            ? MultiplyRecursive<Multiplier, Multiplicand>
            : never
        : never;

export type NumEquals<A extends Num, B extends Num> =
    NumBuffer<A> extends infer AVal
        ? NumBuffer<B> extends infer BVal
            ? AVal extends BVal
                ? BVal extends AVal
                    ? true
                    : false
                : false
            : never
        : never;

export type LessThanOrEqual<A extends Num, B extends Num> =
    Subtract<A, B> extends infer U
        ? U extends number
            ? NumEquals<U, 0>
            : never
        : never;

export type LessThan<A extends Num, B extends Num> =
    LessThanOrEqual<Add<A, 1>, B>;

export type GreaterThanOrEqual<A extends Num, B extends Num> =
    Not<LessThan<A, B>>;

export type GreaterThan<A extends Num, B extends Num> =
    Not<LessThanOrEqual<A, B>>;
