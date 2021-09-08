import { DatumElement, DatumText } from 'datum';

import { ReactEditor } from '../plugin/ReactEditor';

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor<number, number>;
        Element: DatumElement;
        Text: DatumText;
    }
}
