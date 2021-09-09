import { DatumEditor } from '../interfaces/DatumEditor';

import { DatumElement, DatumText } from '../types';

declare module 'slate' {
    interface CustomTypes {
        Editor: DatumEditor<number, number>;
        Element: DatumElement;
        Text: DatumText;
    }
}
