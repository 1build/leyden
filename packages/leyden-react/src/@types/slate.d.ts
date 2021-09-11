import { LaydenElement, LaydenText } from 'leyden';

import { ReactEditor } from '../plugin/ReactEditor';

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor;
        Element: LaydenElement;
        Text: LaydenText;
    }
}
