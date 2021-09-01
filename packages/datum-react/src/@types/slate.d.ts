import { DatumElement, DatumText } from 'datum';

declare module 'slate' {
    interface CustomTypes {
        Element: DatumElement;
        Text: DatumText;
    }
}
