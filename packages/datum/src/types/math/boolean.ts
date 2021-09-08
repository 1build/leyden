export type Bool = true|false;

export type Buffer<X extends Bool> =
    X extends X
        ? X
        : never;

export type Not<X extends Bool> =
    X extends true
        ? false
        : true;

export type And<X extends Bool, Y extends Bool> =
    X extends true
        ? Buffer<Y>
        : false;

export type Or<X extends Bool, Y extends Bool> =
    X extends true
        ? true
        : Buffer<Y>;

export type Nand<X extends Bool, Y extends Bool> =
    X extends true
        ? Not<Y>
        : true;

export type Nor<X extends Bool, Y extends Bool> =
    X extends true
        ? false
        : Not<Y>;

export type Xor<X extends Bool, Y extends Bool> =
    X extends true
        ? Not<Y>
        : Buffer<Y>;

export type Xnor<X extends Bool, Y extends Bool> =
    X extends true
        ? Buffer<Y>
        : Not<Y>;
