import { SlateDatumElement, SlateDatumText } from 'datum';
import { DatumReactEditor } from 'datum-react';

declare module 'slate' {
    interface CustomTypes {
        Editor: DatumReactEditor;
        Element: SlateDatumElement;
        Text: SlateDatumText;
    }
}
