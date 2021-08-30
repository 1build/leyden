import { Descendant } from 'slate';

import { DatumElement, ElementType } from '../interfaces/Element/types';
import { SlateDatumText } from '../interfaces/Text/types';

declare module 'slate' {
    type SlateDatumElement = DatumElement<ElementType, Descendant[]>;

    interface CustomTypes {
        Element: SlateDatumElement;
        Text: SlateDatumText;
    }
}
