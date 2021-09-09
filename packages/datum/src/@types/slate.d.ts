import { DatumEditor } from '../interfaces/DatumEditor';
import { DatumElement } from '../types';

declare module 'slate' {
    interface CustomTypes {
        Editor: DatumEditor<number, number>;
        Element: DatumElement;
    }
}
