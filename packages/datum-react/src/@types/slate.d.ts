import { SlateDatumElement, SlateDatumText } from 'datum';

declare module 'slate' {
    interface CustomTypes {
        Element: SlateDatumElement;
        Text: SlateDatumText;
    }
}
