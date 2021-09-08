import { DatumEditor } from '../interfaces/DatumEditor';
import { DatumElement } from '../interfaces/DatumElement';

declare module 'slate' {
    interface CustomTypes {
        Editor: DatumEditor<number, number>;
        Element: DatumElement;
    }
}
