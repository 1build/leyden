import { DatumElement } from '../interfaces/Element/types';
import { DatumText } from '../interfaces/Text/types';

declare module 'slate' {
    interface CustomTypes {
        Element: DatumElement;
        Text: DatumText;
    }
}
