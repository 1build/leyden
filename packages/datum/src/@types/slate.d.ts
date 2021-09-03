import { DatumEditor } from '../interfaces/DatumEditor';
import { DatumElement } from '../interfaces/Element/DatumElement';
import { DatumText } from '../interfaces/Text/DatumText';

declare module 'slate' {
    interface CustomTypes {
        Editor: DatumEditor;
        Element: DatumElement;
        Text: DatumText;
    }
}
