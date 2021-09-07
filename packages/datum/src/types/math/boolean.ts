export type Bool = true|false;

export type Buffer<A extends Bool> =
    A extends A
        ? A
        : never;

export type Not<A extends Bool> =
    A extends true
        ? false
        : true;

export type And<A extends Bool, B extends Bool> =
    A extends true
        ? Buffer<B>
        : false;

export type Or<A extends Bool, B extends Bool> =
    A extends true
        ? true
        : Buffer<B>;

export type Nand<A extends Bool, B extends Bool> =
    A extends true
        ? Not<B>
        : true;

export type Nor<A extends Bool, B extends Bool> =
    A extends true
        ? false
        : Not<B>;

export type Xor<A extends Bool, B extends Bool> =
    A extends true
        ? Not<B>
        : Buffer<B>;

export type Xnor<A extends Bool, B extends Bool> =
    A extends true
        ? Buffer<B>
        : Not<B>;
