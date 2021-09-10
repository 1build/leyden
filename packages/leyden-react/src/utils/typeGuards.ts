export const notUndefined = <T>(val: T|undefined): val is T => (
    val !== undefined
);
