import { Sheet } from 'datum';
import { Descendant, Element } from 'slate';

export const isSingleSheet = (val: Descendant[]): val is [Sheet] => (
    val.length === 1 && Element.isElement(val[0]) && Sheet.isSheet(val[0])
);

export const notUndefined = <T>(val: T|undefined): val is T => (
    val !== undefined
);
